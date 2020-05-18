const on = '✓';
const off = '✗';

chrome.browserAction.setBadgeText({text: '?'});
chrome.storage.local.get('bedrock_enabled', function(res) {
    let enabled = res.bedrock_enabled;
    chrome.browserAction.setBadgeText({text: enabled ? on : off});
});

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.storage.local.get('bedrock_enabled', function(res) {
        let enabled = res.bedrock_enabled;
        chrome.browserAction.setBadgeText({text: enabled ? on : off});
        chrome.storage.local.set({'bedrock_enabled': !enabled}, function() {
            chrome.browserAction.setBadgeText({text: !enabled ? on : off});
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
            });
        });
    });
});
