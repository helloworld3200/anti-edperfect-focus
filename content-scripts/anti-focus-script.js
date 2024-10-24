// Stops the focus popup from showing on education perfect.
// by helloworld3200 on github (MIT License 2024)

const vals = {
    visibilityChangeEvent: 'visibilitychange',
    webkitVisibilityChangeEvent: 'webkitvisibilitychange',

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
        get: undefined,
        configurable: true
    });
    console.log(object, 'getter set to undefined');
}

function setStateGetter (object = vals.hiddenProperty, state = vals.hiddenState) {
    // Sets the getter of an object to a constant value
    Object.defineProperty(document, object, {
        get: function () {
            console.log(object, 'getter called, returning', state);
            return state;
        },
        configurable: true
    });
    console.log(object, 'getter set to', state);
}

function stopPropagation (event) {
    event.stopImmediatePropagation();
    event.preventDefault();
    console.log(event.type, 'event blocked');
}

function blockFocusPopup () {
    setStateGetter();
    setStateGetter(vals.visibilityStateProperty, vals.visibleState);

    document.addEventListener(vals.visibilityChangeEvent, stopPropagation, true);
    document.addEventListener(vals.webkitVisibilityChangeEvent, stopPropagation, true);

    console.log('Focus popup blocked');
}

function removeBlock () {
    // Removes the block on the focus popup
    setUndefinedGetter();
    setUndefinedGetter(vals.visibilityStateProperty);

    document.removeEventListener(vals.visibilityChangeEvent, stopPropagation, true);
    document.removeEventListener(vals.webkitVisibilityChangeEvent, stopPropagation, true);

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

function setupTests () {
    document.addEventListener(vals.visibilityChangeEvent, (event) => {
        console.log('VISIBILITY CHANGE EVENT FIRED!!!! FAILED TO BLOCK');
    });
}

function main () {
    chrome.storage.onChanged.addListener((changes, namespace) => {
        setupBlock();
    });

    setupBlock();
    setupTests();
}

main();
