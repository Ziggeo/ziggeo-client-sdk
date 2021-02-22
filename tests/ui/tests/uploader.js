QUnit.module("Video Uploader");

QUnit.test("embed via HTML", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-picksnapshots='false' ziggeo-allowrecord='false'></ziggeorecorder><br/>";

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
	rootElement.innerHTML = "<br/><ziggeorecorder ziggeo-theme='modern' ziggeo-timelimit=5 ziggeo-picksnapshots='false' ziggeo-simulate  ziggeo-allowrecord='false'></ziggeorecorder><br/>";

	var recorderElement = rootElement.querySelector("ziggeorecorder");

	ZiggeoApi.V2.Recorder.findByElementPromise(recorderElement).success(function (recorderInstance) {
		recorderInstance.on("verified", function () {
			assert.ok(true, "verified");
			rootElement.innerHTML = "";
			done();
		});
	});
});
