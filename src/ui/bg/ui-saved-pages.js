/* localStorage */

export{
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
	let listItem = document.createElement("li");
	let link = document.createElement("a");
	let currURL = filePaths.key(i);
	let currFileDetails = JSON.parse(filePaths[currURL]);
	let currFilePath = currFileDetails['filePath'];
	let currFileName = currFileDetails['fileName'];

	link.href = "file://" + currFilePath; 
	link.textContent = currFileName;
	listItem?.appendChild(link);
	fileList?.appendChild(listItem);
}