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

const singlefile = globalThis.singlefileBootstrap;

const MAX_CONTENT_SIZE = 32 * (1024 * 1024);

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
		browser.runtime.sendMessage({ method: "ui.processInit" }).catch(() => { });
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

			const docData = helper.preProcessDoc(document, globalThis, optionsAutoSave);
			savePage(docData, frames);
			if (framesSessionId) {
				singlefile.processors.frameTree.cleanup(framesSessionId);
			}
			helper.postProcessDoc(document, docData.markedElements, docData.invalidElements);
			if (optionsAutoSave.userScriptEnabled && waitForUserScript) {
				await waitForUserScript(helper.ON_AFTER_CAPTURE_EVENT_NAME);
			}
			pageAutoSaved = true;
			autoSavingPage = false;

			const SERVER_URL = "http://localhost:3000/fetchdom" // change to global veriable

			// const recursiveUrls = await fetchRecursiveUrls();

			const hrefs = [
				"https://www.mako.co.il/news-money/2022_q3/Article-f5b4a47535c3381027.htm?sCh=31750a2610f26110&pId=1714755246_359753"
				// "https://www.mako.co.il/news-israel/2023_q2/Article-42421a673737881026.htm?sCh=31750a2610f26110&pId=173113802",
				// "https://www.mako.co.il/news-politics/2023_q2/Article-c2785a72b437881026.htm?sCh=31750a2610f26110&pId=173113802",
				// "https://www.mako.co.il/news-columns?partner=NewsNavBar"
			];

			await addServerPrefix(SERVER_URL, hrefs); //change 2nd parameter to 'recursiveUrls'
			await saveRecWrapper(hrefs); // change parameter to 'recursiveUrls'
		}
	}
}

async function addServerPrefix(serverUrl, hrefs) {
	hrefs.forEach((currHref, index) => {
		hrefs[index] = serverUrl + '?externalUrl=' + currHref;
	});
}

async function saveRecWrapper(urlsArr) {
	urlsArr.forEach(url => {

		const testing = browser.runtime.sendMessage({
			method: "autosave.fetchdom",
			url: url
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
	});

}

async function saveRecu(doc, contentWindow) {
	const helper = singlefile.helper;

	try {
		const waitForUserScript2 = contentWindow._singleFile_waitForUserScript;
		let frames2 = [];
		let framesSessionId2;
		autoSaveTimeout = null;
		frames2 = await singlefile.processors.frameTree.getAsync(optionsAutoSave);

		framesSessionId2 = frames2 && frames2.sessionId;
		if (optionsAutoSave.userScriptEnabled && waitForUserScript) {
			await waitForUserScript(helper.ON_BEFORE_CAPTURE_EVENT_NAME);
		}

		const docData2 = helper.preProcessDoc(doc, contentWindow, optionsAutoSave);
		savePage(docData2, frames2, doc);
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
function savePage(docData, frames, window = document, { autoSaveUnload, autoSaveDiscard, autoSaveRemove } = {}) {
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