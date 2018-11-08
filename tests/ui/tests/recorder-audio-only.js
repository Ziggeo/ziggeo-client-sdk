QUnit.test("Embed Recorder Audio Only Via HTML", function(assert) {
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
