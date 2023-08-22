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

var fileList = document.getElementById("fileList");

// Populate the list of file paths from the data.js file
for (var i = 0; i < filePaths.length; i++) {
	var listItem = document.createElement("li");
	var link = document.createElement("a");
	let currURL = filePaths.key(i);
	let currFilePath = filePaths[currURL];

	link.href = "file://" + currFilePath; // Create the file link
	link.textContent = currURL;
	listItem.appendChild(link);
	fileList.appendChild(listItem);
}