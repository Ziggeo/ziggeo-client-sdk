module.exports = function(grunt) {

    var pkg = grunt.file.readJSON('package.json');

    var gruntHelper = require('betajs-compile/grunt.js');
    gruntHelper.init(pkg, grunt);

    require("betajs-scoped");
    var BetaJS = require("betajs");

    gruntHelper.config = {
        pkg: pkg,
        scoped: {
            js_scoped: {
                dest: "temp/ziggeo-scoped.js",
                src: [{
                    src: require.resolve("betajs/dist/beta-noscoped.js"),
                    bindings: {
                        "module": "root:BetaJS"
                    }
                }, {
                    src: require.resolve("betajs-browser/dist/betajs-browser-noscoped.js"),
                    bindings: {
                        "base": "root:BetaJS",
                        "module": "root:BetaJS.Browser"
                    }
                }, {
                    src: require.resolve("betajs-flash/dist/betajs-flash-noscoped.js"),
                    bindings: {
                        "base": "root:BetaJS",
                        "browser": "root:BetaJS.Browser",
                        "module": "root:BetaJS.Flash"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-media/dist/betajs-media-noscoped.js"),
                    bindings: {
                        "base": "root:BetaJS",
                        "browser": "root:BetaJS.Browser",
                        "flash": "root:BetaJS.Flash",
                        "module": "root:BetaJS.Media"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-dynamics/dist/betajs-dynamics-noscoped.js"),
                    bindings: {
                        "base": "root:BetaJS",
                        "browser": "root:BetaJS.Browser",
                        "module": "root:BetaJS.Dynamics"
                    }
                }, {
                    src: require.resolve("betajs-media-components/dist/betajs-media-components-noscoped.js"),
                    bindings: {
                        "base": "root:BetaJS",
                        "browser": "root:BetaJS.Browser",
                        "dynamics": "root:BetaJS.Dynamics",
                        "media": "root:BetaJS.Media",
                        "module": "root:BetaJS.MediaComponents"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-media-components/dist/themes/modern/script.js"),
                    bindings: {
                        "browser": "root:BetaJS.Browser",
                        "dynamics": "root:BetaJS.Dynamics",
                        "module": "root:BetaJS.MediaComponents"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-media-components/dist/themes/cube/script.js"),
                    bindings: {
                        "browser": "root:BetaJS.Browser",
                        "dynamics": "root:BetaJS.Dynamics",
                        "module": "root:BetaJS.MediaComponents"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-media-components/dist/themes/space/script.js"),
                    bindings: {
                        "browser": "root:BetaJS.Browser",
                        "dynamics": "root:BetaJS.Dynamics",
                        "module": "root:BetaJS.MediaComponents"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-media-components/dist/themes/minimalist/script.js"),
                    bindings: {
                        "browser": "root:BetaJS.Browser",
                        "dynamics": "root:BetaJS.Dynamics",
                        "module": "root:BetaJS.MediaComponents"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-media-components/dist/themes/theatre/script.js"),
                    bindings: {
                        "browser": "root:BetaJS.Browser",
                        "dynamics": "root:BetaJS.Dynamics",
                        "module": "root:BetaJS.MediaComponents"
                    },
                    full: true
                }, {
                    src: require.resolve("betajs-media-components/dist/themes/elevate/script.js"),
                    bindings: {
                        "browser": "root:BetaJS.Browser",
                        "dynamics": "root:BetaJS.Dynamics",
                        "module": "root:BetaJS.MediaComponents"
                    },
                    full: true
                }, {
                    src: "src/scripts/ziggeo-preprocessed.js",
                    bindings: {
                        "browser": "root:BetaJS.Browser",
                        "base": "root:BetaJS",
                        "module": "global:ZiggeoApi.V2",
                        "private": "root:ZiggeoApi.V2",
                        "media": "root:BetaJS.Media",
                        "mediacomponents": "root:BetaJS.MediaComponents",
                        "dynamics": "root:BetaJS.Dynamics",
                        "flash": "root:BetaJS.Flash"
                    },
                    full: true
                }, {
                    src: "dist/ziggeo-locales.js",
                    bindings: {
                        "module": "global:ZiggeoApi.V2"
                    },
                    full: true
                }]
            }
        }
    };


    gruntHelper
    .concatTask('playerjs-concat', [
        require.resolve("betajs-media-components/demos/playerjs/player-0.1.0.js"),
        require.resolve("betajs-media-components/demos/playerjs/betajs-adapter.js")
    ], 'temp/playerjs.js', {banner: function () { return ""; }})
    .uglifyTask('playerjs-uglify', 'temp/playerjs.js', 'build/playerjs-adapter.js')
    .simplecopyTask('copy-assets', {
        'build/ziggeo-ie8.eot': require.resolve("betajs-media-components/dist/bjsmc-ie8.eot"),
        'build/ziggeo.swf': require.resolve("betajs-flash/dist/betajs-flash.swf"),
        "build/testing-watermark.png": "./src/css/testing-watermark.png"
    })
    .concatTask("css-concat", [
        require.resolve("betajs-media-components/dist/betajs-media-components.css"),
        require.resolve("betajs-media-components/dist/themes/modern/style.css"),
        require.resolve("betajs-media-components/dist/themes/cube/style.css"),
        require.resolve("betajs-media-components/dist/themes/elevate/style.css"),
        require.resolve("betajs-media-components/dist/themes/minimalist/style.css"),
        require.resolve("betajs-media-components/dist/themes/theatre/style.css"),
        require.resolve("betajs-media-components/dist/themes/space/style.css"),
        "./src/css/*.css"
    ], 'temp/ziggeo-raw.css')
    .replacerTask('css-replace', "temp/ziggeo-raw.css", "temp/ziggeo.css", {"ziggeo-ie8.eot": "bjsmc-ie8.eot"})
    .cssminTask('css-min', 'temp/ziggeo.css', 'build/ziggeo.css')
    .csslinterTask('css-lint', ['temp/ziggeo.css'])
    .yamltojsTask('js-locales', ["src/locales/*.yml"], 'temp/ziggeo-locales-raw.js', './compile/locale.tpl', function (s) {
        return require('he').encode(s);
    })
    .concatTask("js-locales-concat", [
        "src/fragments/module-begin.js-fragment",
        "temp/ziggeo-locales-raw.js",
        "src/fragments/module-end.js-fragment"
    ], 'dist/ziggeo-locales.js')
    .concatTask("js-concat", [
        'vendors/json2.js',
        require.resolve("betajs-shims/dist/betajs-shims.js"),
        "src/fragments/scoped-begin.js-fragment",
        require.resolve("betajs-scoped/dist/scoped.js"),
        "temp/ziggeo-scoped.js",
        "src/fragments/scoped-end.js-fragment"
    ], 'dist/ziggeo.js')
    .gittagTask()
    .browserqunitTask(null, 'tests/ui/tests.html', true)
    .qunitTask("jsdomqunit", 'tests/qunit/credentials.js', grunt.file.expand([
        "./tests/qunit/qunit.js",
        "./tests/qunit/tests/*.js"
    ]), [], {timeout: 1000 * 60 * 60})
    .uglifyTask('js-uglify', 'dist/ziggeo.js', 'build/ziggeo.js');

    gruntHelper.config.shell = gruntHelper.config.shell || {};
    gruntHelper.config.shell['package-locales'] = {
        command: [
            "mkdir -p ./locales",
            "mkdir -p ./locales/ziggeo",
            "mkdir -p ./locales/betajs",
            "cp ../src/locales/* ./locales/ziggeo",
            "cp ../dist/english.yml ./locales/ziggeo",
            "cp ../node_modules/betajs-media-components/src/locales/* ./locales/betajs",
            "cp ../node_modules/betajs-media-components/dist/english.yml ./locales/betajs",
            "tar cfvz ../dist/locales.tar.gz ./locales"
        ].join("&&"),
        options: {
            stdout: true,
            stderr: true,
            execOptions: {
                cwd: 'temp',
                maxBuffer: 1024 * 1024
            }
        }
    };

    grunt.initConfig(gruntHelper.config);

    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('betajs-scoped');

    grunt.registerTask('default', [
        'playerjs',
        'assets',
        'css',
        'js',
        'package-locales'
    ]);

    grunt.registerTask('package-locales', [
        "shell:package-locales"
    ]);

    grunt.registerTask('playerjs', [
        'playerjs-concat',
        'playerjs-uglify'
    ]);

    grunt.registerTask('assets', [
        'copy-assets'
    ]);

    grunt.registerTask('css', [
        'css-concat',
        'css-replace',
        'css-min',
        'css-lint'
    ]);

    grunt.registerTask('js', [
        "js-locales",
        "js-locales-concat",
        "scoped:js_scoped",
        "js-concat",
        "js-uglify",
        "locale-generate-default"
    ]);


    grunt.registerTask("locale-generate-default", function () {
        var done = this.async();
        require('jsdom').jsdom.env("", [
            "./build/ziggeo.js"
        ], function (err, window) {
            var strings = window.ZiggeoApi.V2.Locale.mainLocale.all();
            var lang = {
                "language:en": strings
            };
            var yml = require("js-yaml").dump(lang);
            grunt.file.write("./dist/english.yml", yml);
            done();
        });
    });

    grunt.registerTask("locale-update-translations", function () {
        var yaml = require("js-yaml");
        var translate = require('@google-cloud/translate');

        var languages = [];
        grunt.file.recurse("./src/locales", function (abspath, rootdir, subdir, filename) {
            languages.push(filename.substring(0, filename.indexOf(".")));
        });
        var sourceFile = "./dist/english.yml";
        var targetFolder = "./src/locales/";

        var loadLocale = function (filename) {
            var raw = yaml.safeLoad(grunt.file.read(filename));
            for (var key in raw) {
                return {
                    language: key.split(":").pop(),
                    dict: raw[key] || {}
                };
            }
        };

        languages.forEach(function (targetLang) {

            var targetFile = targetFolder + targetLang + ".yml";
            var source = loadLocale(sourceFile);
            var target = grunt.file.exists(targetFile) ? loadLocale(targetFile) : {language: targetLang, dict: {}};

            var keys = [];
            var values = [];

            for (var key in source.dict) {
                if (!target.dict[key]) {
                    keys.push(key);
                    values.push(source.dict[key]);
                }
            }

            if (keys.length > 0) {
                var translate = translate(JSON.parse(grunt.file.read("./google-translate-creds.json")));
                translate.translate(values, {from: source.language, to: target.language}, function (err, translation) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    for (var i = 0; i < keys.length; ++i)
                        target.dict[keys[i]] = translation[i].replace("% ", " %");

                    var result = {};
                    result["language:" + target.language] = target.dict;
                    grunt.file.write(targetFile, yaml.dump(result));
                });
            }
        });
        this.async();
    });

};