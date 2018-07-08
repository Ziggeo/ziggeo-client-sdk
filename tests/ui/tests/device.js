QUnit.test("detect device microphone camera", function(assert) {
    var done = assert.async();
    ZiggeoApi.V2.Device.media();
    ZiggeoApi.V2.Device.on("device_info", function (cams, mics, camCount, micCount) {
        assert.ok(camCount > 0);
        assert.ok(micCount > 0);
        done();
    });
});