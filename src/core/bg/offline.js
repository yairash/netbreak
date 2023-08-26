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
        const fileName = filePath.split(/[\\/]/).pop();
        setLocalStorageItem(url, JSON.stringify({ filePath: filePath, fileName: fileName }));
    }
    else if (message.method.endsWith(".isLocalResourceSaved")) {
        const url = message.url;
        if (getLocalStorageItem(url) == null) {
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