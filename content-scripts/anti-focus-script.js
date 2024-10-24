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
};

function setGetter (source, object, getter) {
    // Sets the getter of an object to a function
    Object.defineProperty(source, object, {
        get: getter,
        configurable: true
    });
}

function setAllGetters (object, getter) {
    // Sets the getter of an object to a function
    setGetter(document, object, getter);
    setGetter(window, object, getter);
}

function setUndefinedGetter (object = vals.hiddenProperty) {
    // Sets the getter of an object to undefined
    setAllGetters(object, undefined);
    console.log(object, 'getter set to undefined');
}

function setStateGetter (object = vals.hiddenProperty, state = vals.hiddenState) {
    // Sets the getter of an object to a constant value
    setAllGetters(object, () => {
        console.log(object, 'getter called, returning', state);
        return state;
    });
    
    console.log(object, 'getter set to', state);
}

function stopPropagation (event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();
    console.log(event.type, 'event blocked');
}

function addEventListenerToAll (event, listener, capture = true) {
    document.addEventListener(event, listener, capture);
    window.addEventListener(event, listener, capture);
}

function removeEventListenerToAll (event, listener, capture = true) {
    document.removeEventListener(event, listener, capture);
    window.removeEventListener(event, listener, capture);
}

function blockFocusPopup () {
    setStateGetter();
    setStateGetter(vals.visibilityStateProperty, vals.visibleState);

    addEventListenerToAll(vals.visibilityChangeEvent, stopPropagation);
    addEventListenerToAll(vals.webkitVisibilityChangeEvent, stopPropagation);

    console.log('Focus popup blocked');
}

function removeBlock () {
    // Removes the block on the focus popup
    setUndefinedGetter();
    setUndefinedGetter(vals.visibilityStateProperty);

    removeEventListenerToAll(vals.visibilityChangeEvent, stopPropagation, true);
    removeEventListenerToAll(vals.webkitVisibilityChangeEvent, stopPropagation, true);

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

function addVisibilityChangeTest () {
    addEventListenerToAll(vals.visibilityChangeEvent, (event) => {
        console.log('VISIBILITY CHANGE EVENT FIRED!!!! FAILED TO BLOCK');
    }, false);
}

function setupTests () {
    addVisibilityChangeTest();
}

function main () {
    console.log('ANTI-FOCUS SCRIPT BEGIN');

    chrome.storage.onChanged.addListener((changes, namespace) => {
        setupBlock();
    });

    setupBlock();
    setupTests();

    console.log('ANTI-FOCUS SCRIPT END');
}

main();
