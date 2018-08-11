chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
    switch (message.type) {
        case "ping":
            sendResponse({
                type: 'success',
                data: message.data
            });
            break;
        case "acquire":
            if (message.url) sender.tab.url = message.url;
            chrome.desktopCapture.chooseDesktopMedia(message.sources, sender.tab, function (streamId) {
                sendResponse(streamId ? {
                    type: 'success',
                    streamId: streamId
                } : {
                    type: 'error',
                    message: 'Failed to capture stream.'
                });
            });
            break;
    }
    return true;
});