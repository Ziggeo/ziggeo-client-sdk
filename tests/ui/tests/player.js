QUnit.test("Embed Player Via HTML", function(assert) {
    var done = assert.async();

    var rootElement = document.getElementById('visible-fixture');
    rootElement.innerHTML = "<br/><ziggeoplayer ziggeo-video='" + window.ZiggeoDemoVideo + "' ziggeo-theme='modern'></ziggeoplayer><br/>";

    var playerElement = rootElement.querySelector("ziggeoplayer");

    ZiggeoApi.V2.Player.findByElementPromise(playerElement).success(function (playerInstance) {
        playerInstance.on("playing", function () {
            assert.ok(true, "playing");
            playerInstance.on("paused", function () {
                assert.ok(true, "paused");
                rootElement.innerHTML = "";
                done();
            });
        });
        playerInstance.play();
    });
});


QUnit.test("Embed Player Via JS", function(assert) {
    var done = assert.async();

    var rootElement = document.getElementById('visible-fixture');
    rootElement.innerHTML = "<div></div>";

    var playerElement = rootElement.querySelector("div");

    var playerInstance = new ZiggeoApi.V2.Player({
        element: playerElement,
        attrs: {
            video: window.ZiggeoDemoVideo,
            theme: "modern"
        }
    });

    playerInstance.activate();

    playerInstance.on("playing", function () {
        assert.ok(true, "playing");
        playerInstance.on("paused", function () {
            assert.ok(true, "paused");
            playerInstance.destroy();
            done();
        });
    });
    playerInstance.play();
});
