/* localStorage, browser */

export {
	onMessage
};

let filePaths = localStorage;

function onMessage(message, sender) {
	if (message.method.endsWith(".newItemSet")) {
		filePaths = localStorage;
	}
}

let fileList = document.getElementById("fileList");

for (let i = 0; i < filePaths.length; i++) {
	let currURL = filePaths.key(i);
	let currFileDetails = JSON.parse(filePaths[currURL]);
	let currFilePath = currFileDetails['filePath'];
	let currFileName = currFileDetails['fileName'];
	let currDownloadId = currFileDetails['downloadId'];
	isDownloadExistsLocally(currFilePath, currFileName, currDownloadId);
}

async function isDownloadExistsLocally(filePath, fileName, downloadId) {
	await browser.downloads.search({ id: downloadId }).then((downloads) => {
		for (const download of downloads) {
			if (download.exists == true) {
				addFileToList(filePath, fileName);
			}
		}
	});
}

function addFileToList(filePath, fileName) {
	let listItem = document.createElement("li");
	let link = document.createElement("a");
	link.href = "file://" + filePath;
	link.textContent = fileName;
	listItem?.appendChild(link);
	fileList?.appendChild(listItem);
}