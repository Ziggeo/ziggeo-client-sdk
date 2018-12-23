window.ziggeoApi = new ZiggeoApi.V2.Application({
    token: window.ZiggeoApiToken,
    auth: false,
    analytics: false,
    disable_secure_templates: true,
    webrtc_streaming: false,
    webrtc_streaming_if_necessary: false,
    webrtc_on_mobile: true
});