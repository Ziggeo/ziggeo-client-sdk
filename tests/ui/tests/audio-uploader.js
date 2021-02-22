QUnit.module("Audio Uploader");

QUnit.test("embed via HTML", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeoaudiorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-allowrecord='false'></ziggeoaudiorecorder><br/>";

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
			allowrecord: false
		}
	})

	recorder.activate();

	recorder.on("verified", function() {
		assert.ok(true, "verified");
		rootElement.innerHTML = "";
		done();
	});
});

QUnit.test("simulate uploader", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeoaudiorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-simulate  ziggeo-allowrecord='false'></ziggeoaudiorecorder><br/>";

	var recorderElement = rootElement.querySelector("ziggeoaudiorecorder");

	ZiggeoApi.V2.AudioRecorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
		recorderInstance.on("verified", function () {
			assert.ok(true, "verified");
			rootElement.innerHTML = "";
			done();
		});
	});
});