/*
 * Copyright 2010-2020 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 * 
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or 
 *   modify it under the terms of the GNU Affero General Public License 
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 * 
 *   The code in this file is distributed in the hope that it will be useful, 
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of 
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero 
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may 
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU 
 *   AGPL normally required by section 4, provided you include this license 
 *   notice and a URL through which recipients can access the Corresponding 
 *   Source.
 */

/* global browser, globalThis, window, document, location, setTimeout, Node */
import { getAutoSaveNumberOfLinkToDownload } from "../bg/config.js";

const singlefile = globalThis.singlefileBootstrap;

const MAX_CONTENT_SIZE = 32 * (1024 * 1024);

const AZURE_SERVERLESS_URL = "https://net-break.azurewebsites.net/api/httptrigger1"

let unloadListenerAdded, optionsAutoSave, tabId, tabIndex, autoSaveEnabled, autoSaveTimeout, autoSavingPage, pageAutoSaved, previousLocationHref;
singlefile.pageInfo = {
	updatedResources: {},
	visitDate: new Date()
};
browser.runtime.sendMessage({ method: "bootstrap.init" }).then(message => {
	optionsAutoSave = message.optionsAutoSave;
	const options = message.options;
	tabId = message.tabId;
	tabIndex = message.tabIndex;
	autoSaveEnabled = message.autoSaveEnabled;
	if (options && options.autoOpenEditor && detectSavedPage(document)) {
		if (document.readyState == "loading") {
			document.addEventListener("DOMContentLoaded", () => openEditor(document));
		} else {
			openEditor(document);
		}
	} else {
		refresh();
	}
});
browser.runtime.onMessage.addListener(message => {
	if ((autoSaveEnabled && message.method == "content.autosave") ||
		message.method == "content.maybeInit" ||
		message.method == "content.init" ||
		message.method == "content.openEditor" ||
		message.method == "devtools.resourceCommitted") {
		return onMessage(message);
	}
});
document.addEventListener("DOMContentLoaded", init, false);

async function onMessage(message) {
	if (autoSaveEnabled && message.method == "content.autosave") {
		initAutoSavePage(message);
		return {};
	}
	if (message.method == "content.maybeInit") {
		init();
		return {};
	}
	if (message.method == "content.init") {
		optionsAutoSave = message.options;
		autoSaveEnabled = message.autoSaveEnabled;
		refresh();
		return {};
	}
	if (message.method == "content.openEditor") {
		if (detectSavedPage(document)) {
			openEditor(document);
		} else {
			refresh();
		}
		return {};
	}
	if (message.method == "devtools.resourceCommitted") {
		singlefile.pageInfo.updatedResources[message.url] = { content: message.content, type: message.type, encoding: message.encoding };
		return {};
	}
}

function init() {
	if (previousLocationHref != location.href && !singlefile.pageInfo.processing) {
		pageAutoSaved = false;
		previousLocationHref = location.href;
		browser.runtime.sendMessage({ method: "tabs.init", savedPageDetected: detectSavedPage(document) }).catch(() => { });
		browser.runtime.sendMessage({ method: "ui-button.processInit" }).catch(() => { });
	}
}

async function initAutoSavePage(message) {
	optionsAutoSave = message.options;
	if (document.readyState != "complete") {
		await new Promise(resolve => globalThis.addEventListener("load", resolve));
	}
	await autoSavePage();
	if (optionsAutoSave.autoSaveRepeat) {
		setTimeout(() => {
			if (autoSaveEnabled && !autoSavingPage) {
				pageAutoSaved = false;
				optionsAutoSave.autoSaveDelay = 0;
				onMessage(message);
			}
		}, optionsAutoSave.autoSaveRepeatDelay * 1000);
	}
}

async function autoSavePage() {
	const helper = singlefile.helper;
	let rootDownloadData;
	if ((!autoSavingPage || autoSaveTimeout) && !pageAutoSaved) {
		autoSavingPage = true;
		if (optionsAutoSave.autoSaveDelay && !autoSaveTimeout) {
			await new Promise(resolve => autoSaveTimeout = setTimeout(resolve, optionsAutoSave.autoSaveDelay * 1000));
			await autoSavePage();
		}
		else {
			const waitForUserScript = window._singleFile_waitForUserScript;
			let frames = [];
			let framesSessionId;
			autoSaveTimeout = null;
			if (!optionsAutoSave.removeFrames && globalThis.frames && globalThis.frames.length) {
				frames = await singlefile.processors.frameTree.getAsync(optionsAutoSave);
			}

			framesSessionId = frames && frames.sessionId;
			if (optionsAutoSave.userScriptEnabled && waitForUserScript) {
				await waitForUserScript(helper.ON_BEFORE_CAPTURE_EVENT_NAME);
			}

			const absoluteURLs = extractAbsoluteURLsFromDocument(document); // map tag:urls
			let filteredURLs = filterURLsByDomain(document, absoluteURLs); // map tag:urls
			let urlToFileNameMap = new Map();
			urlToFileNameMap = await saveRecWrapperUsingAggReq(filteredURLs); //recursive save
			const modifiedAnchorElemetns = await updateRootDom(document, urlToFileNameMap);
			const docData = helper.preProcessDoc(document, globalThis, optionsAutoSave);
			rootDownloadData = await savePage(docData, frames); //saving root page + extracting it's file name
			if (framesSessionId) {
				singlefile.processors.frameTree.cleanup(framesSessionId);
			}
			helper.postProcessDoc(document, docData.markedElements, docData.invalidElements);
			if (optionsAutoSave.userScriptEnabled && waitForUserScript) {
				await waitForUserScript(helper.ON_AFTER_CAPTURE_EVENT_NAME);
			}
			pageAutoSaved = true;
			autoSavingPage = false;

			handleDownloadComplete(rootDownloadData);
			restoreModifiedAnchorElements(modifiedAnchorElemetns);
		}

	}
}

function handleDownloadComplete(rootDownloadData) {
	const downloadComplete = rootDownloadData.downloadComplete;
	if (downloadComplete == true) {
		const rootFileName = rootDownloadData.fileName;
		const downloadId = rootDownloadData.downloadId;
		setRootPageInLocalStorage(rootFileName, downloadId);
	}
}

async function restoreModifiedAnchorElements(modifiedAnchorElemetns) {
	for (let [anchorElement, url] of modifiedAnchorElemetns) {
		anchorElement.setAttribute('href', url);
	}
}

async function setRootPageInLocalStorage(rootFileName, downloadId) {
	const currentURL = document.URL;
	browser.runtime.sendMessage({
		method: "offline.setOnRuntime",
		url: currentURL,
		filePath: rootFileName,
		downloadId: downloadId
	});

	updateOfflinePagesPage();
}

async function updateOfflinePagesPage() {
	browser.runtime.sendMessage({ method: "ui-offline-pages.newItemSet" });
}

async function updateRootDom(document, urlToFileNameMap) {
	let currentTargetURL = null;
	const anchorElements = document.getElementsByTagName('a');
	let modifiedAnchorElemetns = new Map();

	for (let [url, fileName] of urlToFileNameMap) {
		if (fileName === null) {
			continue; // if page was failed to download it's name field will be null.
		}
		const newHref = `file://${fileName}`;

		if (currentTargetURL === null) {
			currentTargetURL = new URL(url);
		}
		else {
			currentTargetURL.href = url;
		}

		for (const anchorElement of anchorElements) {
			let currAnchorElementHrefAttribute = anchorElement.getAttribute('href');
			if (currAnchorElementHrefAttribute === currentTargetURL.href || currAnchorElementHrefAttribute === currentTargetURL.pathname) {
				anchorElement.setAttribute('href', newHref);
				anchorElement.style.color = "green";
				modifiedAnchorElemetns.set(anchorElement, currAnchorElementHrefAttribute);
				break;
			}
		}
	}

	return modifiedAnchorElemetns;
}

function extractAbsoluteURLsFromDocument(document) {
	let absoluteURLs = new Map();

	function extract(element, parentTag) {
		if (element.tagName === 'A' && element.href && (element.href.startsWith('http://') || element.href.startsWith('https://'))) {
			const url = element.href;
			if (!absoluteURLs.has(parentTag)) {
				absoluteURLs.set(parentTag, new Array());
			}
			absoluteURLs.get(parentTag).push(url);
		}

		const children = element.children;
		for (let i = 0; i < children.length; i++) {
			extract(children[i], element.tagName);
		}
	}

	extract(document.body, ''); // Pass the document's body as the initial element

	return absoluteURLs;
}

function filterURLsByDomain(document, urlsMap) {
	const currentDomain = document.location.hostname;
	const filteredURLs = new Map();

	urlsMap.forEach((urls, tag) => {
		const filteredUrls = Array.from(urls).filter(url => {
			const urlObj = new URL(url);
			return urlObj.hostname === currentDomain;
		});

		if (filteredUrls.length > 0) {
			filteredURLs.set(tag, new Array(filteredUrls));
		}
	});

	return filteredURLs;
}

async function saveRecWrapperUsingAggReq(tagToUrlsMap) {
	const urlsLimit = await getAutoSaveNumberOfLinkToDownload();
	let urlsCounter = 0, downloadData, fileName, urlsToDownload = [];
	const urlToFileNameMap = new Map();
	for (let [tag, urls] of tagToUrlsMap) {
		if (tag !== "p" && tag !== "P") { continue }; //TEST
		urlsToDownload = urlsToDownload.concat(urls[0].slice(0, urlsLimit - urlsCounter)); // (urlsLimit - urlsCounter) for limit check
		urlsCounter += urlsToDownload.length;
		if (urlsCounter >= urlsLimit) {
			// limit reached
			break;
		}
	}

	const domsJson = await browser.runtime.sendMessage({
		method: "autosave.fetchdom",
		server: AZURE_SERVERLESS_URL,
		urls: urlsToDownload
	});
	const domsArray = JSON.parse(domsJson);
	for (let i = 0; i < domsArray.length; i++) {
		let dom = domsArray[i];
		let parser = new DOMParser();
		let parsedDom = parser.parseFromString(dom, 'text/html');
		downloadData = await saveRecu(parsedDom, null);
		if (downloadData.downloadComplete === false) {
			fileName = null;
		}
		else {
			fileName = downloadData.fileName;
		}
		urlToFileNameMap.set(urlsToDownload[i], fileName);
	}

	return urlToFileNameMap;
}

// older version of saving page - request per url
async function saveRecWrapper(tagMap) {
	for (let [tag, currArr] of tagMap) {

		for (let i = 0; i < currArr[0].length && i < 1; i++) {
			console.log(currArr[0][i]);
			const testing = browser.runtime.sendMessage({
				method: "autosave.fetchdom",
				url: currArr[0][i]
			});

			testing.then(async (domResponse) => {
				const parser = new DOMParser();
				const dom = parser.parseFromString(domResponse, 'text/html');
				const iframe = document.createElement('iframe');
				iframe.id = 'myiframe2'
				iframe.style.width = '100%';
				iframe.style.height = '500px';
				iframe.style.display = 'none'; // Hide the iframe

				document.body.appendChild(iframe);

				// Write the modified HTML content to the iframe's contentDocument
				const iframeDocument = iframe.contentDocument;
				iframeDocument.open();
				iframeDocument.write(dom.documentElement.innerHTML);
				iframeDocument.close();

				const contentWindow = iframe.contentWindow;

				var iframeDoc = document.getElementById('myiframe2');
				iframeDoc.addEventListener("load", async function () {
					await saveRecu(dom, contentWindow);
				});
			});
		}
	}

}

async function saveRecu(doc, contentWindow) {
	const helper = singlefile.helper;
	let downloadData;
	try {
		// const waitForUserScript2 = contentWindow._singleFile_waitForUserScript; //giving up on contentWinow
		let frames2 = [];
		let framesSessionId2;
		autoSaveTimeout = null;
		frames2 = await singlefile.processors.frameTree.getAsync(optionsAutoSave);

		framesSessionId2 = frames2 && frames2.sessionId;
		if (optionsAutoSave.userScriptEnabled && waitForUserScript) {
			await waitForUserScript(helper.ON_BEFORE_CAPTURE_EVENT_NAME);
		}

		// const docData2 = helper.preProcessDoc(doc, contentWindow, optionsAutoSave); //giving up on contentWinow
		const docData2 = helper.preProcessDoc(doc, null, optionsAutoSave);
		downloadData = savePage(docData2, frames2, doc);
		if (framesSessionId2) {
			singlefile.processors.frameTree.cleanup(framesSessionId2);
		}
		helper.postProcessDoc(doc, docData2.markedElements, docData2.invalidElements);
		if (optionsAutoSave.userScriptEnabled && waitForUserScript) {
			await waitForUserScript(helper.ON_AFTER_CAPTURE_EVENT_NAME);
		}
		pageAutoSaved = true;
		autoSavingPage = false;
	}
	catch (e) {
		console.log("Failed!");
		console.log(e);
	}

	return downloadData;
}


function refresh() {
	if (autoSaveEnabled && optionsAutoSave && (optionsAutoSave.autoSaveUnload || optionsAutoSave.autoSaveLoadOrUnload || optionsAutoSave.autoSaveDiscard || optionsAutoSave.autoSaveRemove)) {
		if (!unloadListenerAdded) {
			globalThis.addEventListener("unload", onUnload);
			document.addEventListener("visibilitychange", onVisibilityChange);
			unloadListenerAdded = true;
		}
	} else {
		globalThis.removeEventListener("unload", onUnload);
		document.removeEventListener("visibilitychange", onVisibilityChange);
		unloadListenerAdded = false;
	}
}

function onVisibilityChange() {
	if (document.visibilityState == "hidden" && optionsAutoSave.autoSaveDiscard) {
		autoSaveUnloadedPage({ autoSaveDiscard: optionsAutoSave.autoSaveDiscard });
	}
}

function onUnload() {
	if (!pageAutoSaved && (optionsAutoSave.autoSaveUnload || optionsAutoSave.autoSaveLoadOrUnload || optionsAutoSave.autoSaveRemove)) {
		autoSaveUnloadedPage({ autoSaveUnload: optionsAutoSave.autoSaveUnload, autoSaveRemove: optionsAutoSave.autoSaveRemove });
	}
}

function autoSaveUnloadedPage({ autoSaveUnload, autoSaveDiscard, autoSaveRemove }) {
	const helper = singlefile.helper;
	const waitForUserScript = window._singleFile_waitForUserScript;
	let frames = [];
	if (!optionsAutoSave.removeFrames && globalThis.frames && globalThis.frames.length) {
		frames = singlefile.processors.frameTree.getSync(optionsAutoSave);
	}
	if (optionsAutoSave.userScriptEnabled && waitForUserScript) {
		waitForUserScript(helper.ON_BEFORE_CAPTURE_EVENT_NAME);
	}
	const docData = helper.preProcessDoc(document, globalThis, optionsAutoSave);
	savePage(docData, frames, { autoSaveUnload, autoSaveDiscard, autoSaveRemove });
}

// added argument called testDoc which by default is document
async function savePage(docData, frames, window = document, { autoSaveUnload, autoSaveDiscard, autoSaveRemove } = {}) {
	const helper = singlefile.helper;
	const updatedResources = singlefile.pageInfo.updatedResources;
	const visitDate = singlefile.pageInfo.visitDate.getTime();
	Object.keys(updatedResources).forEach(url => updatedResources[url].retrieved = false);
	const sending = browser.runtime.sendMessage({
		method: "autosave.save",
		tabId,
		tabIndex,
		taskId: optionsAutoSave.taskId,
		content: helper.serialize(window), //previously the serialize func used the 'document'
		canvases: docData.canvases,
		fonts: docData.fonts,
		stylesheets: docData.stylesheets,
		images: docData.images,
		posters: docData.posters,
		usedFonts: docData.usedFonts,
		shadowRoots: docData.shadowRoots,
		videos: docData.videos,
		referrer: docData.referrer,
		frames: frames,
		url: location.href,
		updatedResources,
		visitDate,
		autoSaveUnload,
		autoSaveDiscard,
		autoSaveRemove
	});

	const downloadData = await sending.then((downloadData) => {
		return downloadData;
	}).catch(() => {
		return { downloadComplete: false, fileName: null };
	});
	return downloadData;
}

async function openEditor(document) {
	const infobarElement = document.querySelector("singlefile-infobar");
	if (infobarElement) {
		infobarElement.remove();
	}
	serializeShadowRoots(document);
	const content = singlefile.helper.serialize(document);
	for (let blockIndex = 0; blockIndex * MAX_CONTENT_SIZE < content.length; blockIndex++) {
		const message = {
			method: "editor.open",
			filename: decodeURIComponent(location.href.match(/^.*\/(.*)$/)[1])
		};
		message.truncated = content.length > MAX_CONTENT_SIZE;
		if (message.truncated) {
			message.finished = (blockIndex + 1) * MAX_CONTENT_SIZE > content.length;
			message.content = content.substring(blockIndex * MAX_CONTENT_SIZE, (blockIndex + 1) * MAX_CONTENT_SIZE);
		} else {
			message.content = content;
		}
		await browser.runtime.sendMessage(message);
	}
}

function detectSavedPage(document) {
	const helper = singlefile.helper;
	const firstDocumentChild = document.documentElement.firstChild;
	return firstDocumentChild.nodeType == Node.COMMENT_NODE &&
		(firstDocumentChild.textContent.includes(helper.COMMENT_HEADER) || firstDocumentChild.textContent.includes(helper.COMMENT_HEADER_LEGACY));
}

function serializeShadowRoots(node) {
	const SHADOWROOT_ATTRIBUTE_NAME = "shadowroot";
	node.querySelectorAll("*").forEach(element => {
		const shadowRoot = singlefile.helper.getShadowRoot(element);
		if (shadowRoot) {
			serializeShadowRoots(shadowRoot);
			const templateElement = document.createElement("template");
			templateElement.setAttribute(SHADOWROOT_ATTRIBUTE_NAME, "open");
			templateElement.appendChild(shadowRoot);
			element.appendChild(templateElement);
		}
	});
}

window.addEventListener("offline", function (event) {
	handleOfflineAtRuntime();
});

async function handleOfflineAtRuntime() {
	const currentURL = document.URL;
	const isLocalResourceSaved = await checkIsLocalResourceInLocalStorage(currentURL);

	if (isLocalResourceSaved == true) {
		handleLocalResourceInLocalStorage(currentURL);
	}
	else {
		//ignore - there is no local version of this page!
	}
}

async function checkIsLocalResourceInLocalStorage(currentURL) {
	const isLocalResourceSaved = await browser.runtime.sendMessage({
		method: "offline.isLocalResourceSaved",
		url: currentURL
	});

	return isLocalResourceSaved;
}

function handleLocalResourceInLocalStorage(currentURL) {
	let popupAnswer = confirm("Connection has lost! fortunately NetBreak found a local version of this page. Press OK to load it.");
	if (popupAnswer == true) {
		browser.runtime.sendMessage({
			method: "offline.getOnRruntime",
			url: currentURL
		});
	}
	else {
		//ignore if cancel was pressed
	}
}
