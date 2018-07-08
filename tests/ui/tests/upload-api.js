QUnit.test("test upload api", function(assert) {
    var done = assert.async();

    var rootElement = document.getElementById('visible-fixture');
    rootElement.innerHTML = "Please select video file: <input type='file' name='file' />";

    var fileElement = rootElement.querySelector("input");

    fileElement.onchange = function () {
        ZiggeoApi.V2.Application.getDefault().videos.createByUpload({
            video_data: fileElement
        }).callback(function (error) {
            assert.ok(!error);
            rootElement.innerHTML = "";
            done();
        });
    };
});