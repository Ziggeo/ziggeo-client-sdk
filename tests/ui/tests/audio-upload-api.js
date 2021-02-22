QUnit.module("Audio Upload API");

QUnit.test("upload audio", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "Please select audio file: <input type='file' name='file' />";

	var fileElement = rootElement.querySelector("input");

	fileElement.onchange = function () {
		ZiggeoApi.V2.Application.getDefault().audios.createByUpload({
			audio_data: fileElement
		}).callback(function (error) {
			assert.ok(!error);
			rootElement.innerHTML = "";
			done();
		});
	};
});