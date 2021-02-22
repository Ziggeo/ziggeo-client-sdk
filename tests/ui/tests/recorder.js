QUnit.module("Video Recorder");

QUnit.test("embed via HTML", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-picksnapshots='false' ziggeo-allowupload='false'></ziggeorecorder><br/>";

	var recorderElement = rootElement.querySelector("ziggeorecorder");

	ZiggeoApi.V2.Recorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
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

	var recorder = new ZiggeoApi.V2.Recorder({
		element: document.querySelector("#recorder"),
		attrs: {
			theme: "modern",
			timelimit: 5,
			picksnapshots: false,
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
	rootElement.innerHTML = "<br/><ziggeorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-picksnapshots='false' ziggeo-simulate  ziggeo-allowupload='false'></ziggeorecorder><br/>";

	var recorderElement = rootElement.querySelector("ziggeorecorder");

	ZiggeoApi.V2.Recorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
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
		rootElement.innerHTML = "<br/><ziggeorecorder ziggeo-theme='modern' ziggeo-timelimit=10 ziggeo-picksnapshots='false' ziggeo-allowupload='false'></ziggeorecorder><br/>";

		var recorderElement = rootElement.querySelector("ziggeorecorder");

		ZiggeoApi.V2.Recorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
			recorderInstance.on("verified", function () {
				assert.ok(true, "verified");
				rootElement.innerHTML = "";
				done();
				ZiggeoApi.V2.Application.getDefault().data.set("webrtc_streaming", oldWebrtcStreaming);
			});
		});
	});
}