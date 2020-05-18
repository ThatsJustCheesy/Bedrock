function disableHandler(element, handlerName) {
    handlerName = 'on' + handlerName;
    let handler = element[handlerName];
    element[handlerName] = (ev) => ev.preventDefault();
    return handler;
}
function restoreHandler(element, handlerName, handler) {
    handlerName = 'on' + handlerName;
    element[handlerName] = handler;
}

function obscure() {
    for (e of document.getElementsByTagName('a')) {
        let color = e.style.color;
    
        let handlers = ['click'/*, 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'focusin', 'focusout', 'keyup', 'keydown'*/];
        for (let i = 0; i < handlers.length; i++) {
            let handlerName = handlers[i];
            handlers[i] = [handlerName, disableHandler(e, handlerName)];
        }
    
        e.onclick = function(ev) {
            let e = ev.target;
            e.style.color = color;

            for (let i = 0; i < handlers.length; i++) {
                let handlerName = handlers[i][0];
                let handler = handlers[i][1];
                restoreHandler(e, handlerName, handler);
            }
        };
    
        e.style.color = 'inherit';
    }
}

chrome.storage.local.get('bedrock_enabled', function(res) {
    let enabled = res.bedrock_enabled;
    if (enabled) obscure();
});
