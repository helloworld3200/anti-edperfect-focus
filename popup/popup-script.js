// Adds interactivity for the UI in the popup
// by helloworld3200 on github (MIT License 2024)

const vals = {
    storeKeys: {
        enabled: "enabled"
    }
};

function onCheckboxClick(checkbox) {
    // Save the state of the checkbox to the storage
    if (checkbox.checked) {
        chrome.storage.local.set({ [vals.storeKeys.enabled] : true }).then(() => {
            console.log("Storage key enabled set to true");
        });
    } else {
        chrome.storage.local.set({ [vals.storeKeys.enabled] : false }).then(() => {
            console.log("Storage key enabled set to false");
        });
    }
}

function main () {
    // Get the checkbox element
    const checkbox = document.getElementById("enabled");

    // Get the current state of the extension from storage
    chrome.storage.local.get([vals.storeKeys.enabled]).then((result) => {
        // Set the checkbox to the state of the extension
        checkbox.checked = result.enabled;
    });
}

main();
