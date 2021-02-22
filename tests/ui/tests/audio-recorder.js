QUnit.module("Audio Recorder");

QUnit.test("embed via HTML", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeoaudiorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-allowupload='false'></ziggeoaudiorecorder><br/>";

	var recorderElement = rootElement.querySelector("ziggeoaudiorecorder");

	ZiggeoApi.V2.AudioRecorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
		recorderInstance.on("verified", function () {
			assert.ok(true, "verified");
			rootElement.innerHTML = "";
			done();
		});
	});
});

QUnit.test("embed via JS", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><div id='recorder'></div><br/>";

	var recorder = new ZiggeoApi.V2.AudioRecorder({
		element: document.querySelector("#recorder"),
		attrs: {
			theme: "modern",
			timelimit: 5,
			allowupload: false
		}
	})

	recorder.activate();

	recorder.on("verified", function() {
		assert.ok(true, "verified");
		rootElement.innerHTML = "";
		done();
	});
});

QUnit.test("simulate recorder", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeoaudiorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-simulate  ziggeo-allowupload='false'></ziggeoaudiorecorder><br/>";

	var recorderElement = rootElement.querySelector("ziggeoaudiorecorder");

	ZiggeoApi.V2.AudioRecorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
		recorderInstance.on("verified", function () {
			assert.ok(true, "verified");
			rootElement.innerHTML = "";
			done();
		});
	});
});

if (!window.ZiggeoLocal) {
	QUnit.test("record with webrtc streaming", function (assert) {
		var oldWebrtcStreaming = ZiggeoApi.V2.Application.getDefault().data.get("webrtc_streaming");
		ZiggeoApi.V2.Application.getDefault().data.set("webrtc_streaming", true);
		var done = assert.async();

		var rootElement = document.getElementById('visible-fixture');
		rootElement.innerHTML = "<br/><ziggeoaudiorecorder ziggeo-theme='modern' ziggeo-timelimit=10 ziggeo-allowupload='false'></ziggeoaudiorecorder><br/>";

		var recorderElement = rootElement.querySelector("ziggeoaudiorecorder");

		ZiggeoApi.V2.AudioRecorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
			recorderInstance.on("verified", function () {
				assert.ok(true, "verified");
				rootElement.innerHTML = "";
				done();
				ZiggeoApi.V2.Application.getDefault().data.set("webrtc_streaming", oldWebrtcStreaming);
			});
		});
	});
}