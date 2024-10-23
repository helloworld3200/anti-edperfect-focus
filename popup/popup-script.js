// Adds interactivity for the UI in the popup
// by helloworld3200 on github (MIT License 2024)

function onCheckboxClick(checkbox) {
    // Save the state of the checkbox to the storage
    if (checkbox.checked) {
        chrome.storage.sync.set({ "enabled": true });
    } else {
        chrome.storage.sync.set({ "enabled": false });
    }
}

function main () {
    // Get the checkbox element
    const checkbox = document.getElementById("enabled");

    // Get the current state of the extension from storage
    chrome.storage.sync.get("enabled", (result) => {
        // Set the checkbox to the state of the extension
        checkbox.checked = result.enabled;
    });
}

main();
