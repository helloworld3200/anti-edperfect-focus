// Stops the focus popup from showing on education perfect.

const vals = {
    visibilityChangeEvent: 'visibilitychange',

    hiddenProperty: 'hidden',
    visibilityStateProperty: 'visibilityState',

    visibleState: 'visible',
    hiddenState: false,

    storeKeys: {
        enabled: "enabled"
    }
}

function setUndefinedGetter (object = vals.hiddenProperty) {
    // Sets the getter of an object to undefined
    Object.defineProperty(document, object, {
        get: undefined
    });
    console.log(object, 'getter set to undefined');
}

function setStateGetter (object = vals.hiddenProperty, state = vals.hiddenState) {
    // Sets the getter of an object to a constant value
    Object.defineProperty(document, object, {
        get: function () {
            return state;
        }
    });
    console.log(object, 'getter set to', state);
}

function stopPropagation (event) {
    event.stopImmediatePropagation();
    console.log(event.type, 'event blocked');
}

function blockFocusPopup () {
    setStateGetter();
    setStateGetter(vals.visibilityStateProperty, vals.visibleState);
    document.addEventListener(vals.visibilityChangeEvent, stopPropagation, true);
    console.log('Focus popup blocked');
}

function removeBlock () {
    // Removes the block on the focus popup
    setUndefinedGetter();
    setUndefinedGetter(vals.visibilityStateProperty);
    document.removeEventListener(vals.visibilityChangeEvent, stopPropagation, true);
    console.log('Block removed');
}

function setupBlock () {
    // Sets up the block on the focus popup
    chrome.storage.local.get([vals.storeKeys.enabled]).then((result) => {
        if (result.enabled) {
            blockFocusPopup();
        } else {
            removeBlock();
        }
    });
}

function main () {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        setupBlock();
    });

    setupBlock();
}

main();
