
const vals = {
    storeKeys: {
        enabled: "enabled"
    }
};

function setupInitialStorage () {
    chrome.storage.local.set({ [vals.storeKeys.enabled] : true }).then(() => {
        console.log("Storage key enabled set to true");
    });
}

function setupInitial () {
    setupInitialStorage();
}

function main () {
    chrome.runtime.onInstalled.addListener(
        setupInitial
    );
}

main();