QUnit.module("deprecated", {
	
	__init: function () {
		stop();
		ziggeoApp.videos.index({states: "ALL"}).success(function (videos) {
			start();
			videos.forEach(function (video) {
				stop();
                ziggeoApp.videos.destroy(video.token).success(function () {
                	start();
				});
			});
        });
	},
	
	setup : function() {
		stop();
		var self = this;
		setTimeout(function () {
			start();
			self.__init();
		}, TestConfig.local ? 1000 : 10000);
	},
	
	teardown : function() {
		stop();
        var self = this;
        setTimeout(function () {
            start();
            self.__init();
        }, TestConfig.local ? 1000 : 10000);
	}
	
});


test("create-client-delete-client", function() {
	stop();
	ziggeoApp.videos.create({}).success(function (video) {
		start();
		ok(video != null);
		stop();
        ziggeoApp.videos.destroy(video.token).success(function () {
			start();
			ok(true);
		}).error(function () {
			start();
			ok(false);
        });
	}).error(function () {
		start();
		ok(false);
	});
});


test("create-client-find-client", function() {
	stop();
    ziggeoApp.videos.create({}).success(function (video) {
		ok(video != null);
        ziggeoApp.videos.get(video.token).success(function () {
            start();
            ok(true);
        }).error(function () {
            start();
            ok(false);
        });
    }).error(function () {
        start();
        ok(false);
    });
});

test("create-client-key-find-client", function() {
	stop();
    ziggeoApp.videos.create({key: "mytestvideo"}).success(function (video) {
		start();
		ok(video != null);
		stop();
        ziggeoApp.videos.get("_mytestvideo").success(function () {
            start();
            ok(true);
        }).error(function () {
            start();
            ok(false);
        });
	}).error(function () {
		start();
		ok(false);
	});
});


test("create-client-key-delete-client", function() {
	stop();
    ziggeoApp.videos.create({key: "mytestvideo2"}).success(function (video) {
		start();
		ok(video != null);
		stop();
		ziggeoApp.videos.destroy("_mytestvideo2").success(function () {
			start();
			ok(true);
		}).error(function () {
			start();
			ok(false);
		});
    }).error(function () {
        start();
        ok(false);
    });
});

test("create-client-tags-find-client", function() {
	stop();
    ziggeoApp.videos.create({tags: "abc,def" }).success(function (video) {
		start();
		ok(video != null);
		stop();
        ziggeoApp.videos.index({states: "ALL", tags: "abc,def"}).success(function (success_data) {
			start();
			ok(success_data.length == 1);
        }).error(function () {
            start();
            ok(false);
        });
    }).error(function () {
        start();
        ok(false);
    });
});



test("uploader-test", function () {
	stop();
    ziggeoApp.videos.createByUpload({
        video_data: new window.Blob([require('fs').readFileSync(TestResources.video_file)], {
        	type: "video/mp4"
        })
    }).error(function (e) {
        start();
        ok(false);
    }).success(function (result) {
		start();
		ok(result != null);
		ok(result.video != null);
		ok(result.stream != null);
		stop();
		ziggeoApp.streams._uploader_state(result.video.token, result.stream.token).success(function () {
			start();
			ok(true);
		}).error(function () {
			start();
			ok(false);
		});
	});
});


test("uploader-test-2", function () {
	var count = 100;
	stop();
    ziggeoApp.videos.createByUpload({
        video_data: new window.Blob([require('fs').readFileSync(TestResources.video_file_mov)], {
            type: "video/mov"
        })
    }).error(function () {
        start();
        ok(false);
    }).success(function (result) {
		start();
		ok(result != null);
		ok(result.video != null);
		ok(result.stream != null);
		stop();
		var f = function () {
            ziggeoApp.streams._uploader_state(result.video.token, result.stream.token).success(function () {
				start();
				ok(true);
			}).error(function (error) {
				count--;
				start();
				if (error.status_code() == 412 && count >= 0) {
					stop();
					setTimeout(function () {
						f();
					}, 1000);
					return;
				}
				ok(false, error);
			});
		};
		f();
	});
});
