/* global browser, localStorage */

export {
    onMessage
};

async function onMessage(message, sender) {
    if (message.method.endsWith(".getOnRruntime")) {
        const url = message.url;
        offlineModeHandler(url);
    }
    else if (message.method.endsWith(".setOnRuntime")) {
        const url = message.url;
        const filePath = message.filePath;
        const downloadId = message.downloadId;
        const fileName = filePath.split(/[\\/]/).pop();
        setLocalStorageItem(url, JSON.stringify({ filePath: filePath, fileName: fileName, downloadId: downloadId }));
    }
    else if (message.method.endsWith(".isLocalResourceSaved")) {
        const url = message.url;
        const downloadExists = await isDownloadExists(url);
        if (downloadExists == false) {
            return false;
        }
        else {
            return true;
        }
    }

    return true;
}

function offlineModeHandler(url) {
    const fileDetails = JSON.parse(getLocalStorageItem(url));
    let filePath;
    if (fileDetails != null) {
        filePath = fileDetails['filePath'];
        browser.tabs.create({
            url: `file://${filePath}`
        });
    }
}

async function isDownloadExists(url) {
    if (getLocalStorageItem(url) != null) {
        const fileDetails = JSON.parse(getLocalStorageItem(url));
        if (fileDetails == null) {
            removeLocalStorageItem(url);
            return false;
        }
        else {
            const downloadId = fileDetails['downloadId'];
            const downloadExists = await browser.downloads.search({ id: downloadId }).then((downloads) => {
                for (const download of downloads) {
                    return download.exists;
                }
            });

            if (downloadExists == false) {
                removeLocalStorageItem(url);
            }
            return downloadExists;
        }
    }
    else {
        return false;
    }
}

function getLocalStorageItem(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function setLocalStorageItem(key, value) {
    try {
        return localStorage.setItem(key, value);
    } catch (error) {
        // ignored
    }
}

function removeLocalStorageItem(key) {
    try {
        return localStorage.removeItem(key);
    } catch (error) {
        // ignored
    }
}