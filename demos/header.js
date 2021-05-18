window.ziggeoApi = new ZiggeoApi.V2.Application({
    token: window.ZiggeoApiToken,
    auth: false,
    analytics: false,
    disable_secure_templates: true,
    webrtc_streaming: false,
    webrtc_on_mobile: true,
//    webrtc_streaming_if_necessary: false,
    chrome_extension_id: window.ZiggeoChromeExtensionId,
    chrome_extension_install_link: window.ZiggeoChromeExtensionInstallLink,
    opera_extension_id: window.ZiggeoOperaExtensionId,
    opera_extension_install_link: window.ZiggeoOperaExtensionInstallLink
});