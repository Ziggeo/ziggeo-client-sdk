QUnit.module("Audio Player");

QUnit.test("embed via HTML", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<br/><ziggeoaudioplayer ziggeo-audio='" + window.ZiggeoDemoAudio + "' ziggeo-theme='modern'></ziggeoaudioplayer><br/>";

	var playerElement = rootElement.querySelector("ziggeoaudioplayer");

	ZiggeoApi.V2.AudioPlayer.findByElementPromise(playerElement).success(function (playerInstance) {
		playerInstance.on("playing", function () {
			assert.ok(true, "playing");
			playerInstance.on("paused ended", function () {
				assert.ok(true, "paused");
				rootElement.innerHTML = "";
				done();
			}, this, {eventually: true});
		});
	});
});


QUnit.test("embed via JS", function(assert) {
	var done = assert.async();

	var rootElement = document.getElementById('visible-fixture');
	rootElement.innerHTML = "<div id='player'></div>";

	var playerElement = rootElement.querySelector("#player");

	var playerInstance = new ZiggeoApi.V2.AudioPlayer({
		element: playerElement,
		attrs: {
			audio: window.ZiggeoDemoAudio,
			theme: "modern"
		}
	});

	playerInstance.activate();

	playerInstance.on("playing", function () {
		assert.ok(true, "playing");
		playerInstance.on("paused ended", function () {
			assert.ok(true, "paused");
			playerInstance.destroy();
			done();
		}, this, {eventually: true});
	});
	//playerInstance.play();
});
