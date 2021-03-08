QUnit.module("Video Recorder (Audio Only)");

QUnit.test("embed via HTML", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-picksnapshots='false' ziggeo-allowupload='false' ziggeo-onlyaudio='true' ziggeo-width='400' ziggeo-height='200'></ziggeorecorder><br/>";

	var recorderElement = rootElement.querySelector("ziggeorecorder");

	ZiggeoApi.V2.Recorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
		recorderInstance.on("verified", function () {
			assert.ok(true, "verified");
			rootElement.innerHTML = "";
			done();
		});
		if (!QUnit.isMobile)
			recorderInstance.record();
	});
});


if (!window.ZiggeoLocal) {
	QUnit.test("record with webrtc streaming", function (assert) {
		var oldWebrtcStreaming = ZiggeoApi.V2.Application.getDefault().data.get("webrtc_streaming");
		ZiggeoApi.V2.Application.getDefault().data.set("webrtc_streaming", true);
		var done = assert.async();

		var rootElement = document.getElementById('visible-fixture');
		rootElement.innerHTML = "<br/><ziggeorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-picksnapshots='false' ziggeo-allowupload='false' ziggeo-onlyaudio='true' ziggeo-width='400' ziggeo-height='200'></ziggeorecorder><br/>";

		var recorderElement = rootElement.querySelector("ziggeorecorder");

		ZiggeoApi.V2.Recorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
			recorderInstance.on("verified", function () {
				assert.ok(true, "verified");
				rootElement.innerHTML = "";
				done();
				ZiggeoApi.V2.Application.getDefault().data.set("webrtc_streaming", oldWebrtcStreaming);
			});
			if (!QUnit.isMobile)
				recorderInstance.record();
		});
	});
}