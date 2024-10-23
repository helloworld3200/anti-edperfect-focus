// Stops the focus popup from showing on education perfect.

function setConstantDocumentHidden (state = false) {
    // Sets the document.hidden property to a constant value
    Object.defineProperty(document, 'hidden', {
        get: function () {
            return state;
        }
    });
    console.log('document.hidden set to', state);
}

function setConstantVisibilityState (state = 'visible') {
    // Sets the visibilityState property to a constant value
    Object.defineProperty(document, 'visibilityState', {
        get: function () {
            return state;
        }
    });
    console.log('visibilityState set to', state);
}

function stopVisibilityChange () {
    // Stops the visibilitychange event from ever firing
    document.addEventListener('visibilitychange', function(event) {
        // Stop the event
        event.stopImmediatePropagation();
        console.log('visibilitychange event blocked');
    }, true);
}

function blockFocusPopup (block = true) {
    
}

function main () {
    setConstantDocumentHidden();
    setConstantVisibilityState();
    stopVisibilityChange();
}

main();
