console.log("Init JSDOM...");
global.jsdom = require('jsdom');
global.document = jsdom.jsdom("<div><div id='qunit-fixture'></div></div>", {}, {});
global.window = document.defaultView;
global.navigator = window.navigator;

global.TestResources = {
	video_file: __dirname + "/../assets/video1s.mp4",
	image_file: __dirname + "/../assets/image1s.png",
	video_flv_file: __dirname + "/../assets/video1s.flv",
	video_file_mov: __dirname + "/../assets/iphone_rotated.mov",
	no_video_file: __dirname + "/../assets/novideo.mp4"
};

window.ZiggeoLocal = TestConfig.local;
window.ZiggeoDev = TestConfig.dev;

test("jsdom", function () {
	console.log("Loading ziggeo.js...");
	stop();
	jsdom.jQueryify(window, "build/ziggeo.js", function () {
		global.ZiggeoApi = window.ZiggeoApi;
		global.ziggeoApp = new ZiggeoApi.V2.Application({
			token: TestConfig.application_token
		});
		window.console = console;
		console.log("Ready.");
	    start();
	    ok(true);
	});	
});