QUnit.test("Embed Uploader Via HTML", function(assert) {
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

QUnit.test("Embed Uploader simulate", function(assert) {
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
