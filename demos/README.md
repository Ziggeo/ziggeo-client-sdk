# Demos

These demos showcase some of the SDK features.

## Configuration
- Create a `credentials.js` file inside the demos folder
- The file should contain the following variables (please replace the strings with the correct values):
```js
window.ZiggeoApiToken = "APP_TOKEN";
window.ZiggeoDemoVideo = "YOUR_DEMO_VIDEO_TOKEN";
window.ZiggeoDemoVideo2 = "YOUR_DEMO_VIDEO_TOKEN_2";
window.ZiggeoDemoAudio = "YOUR_DEMO_AUDIO_TOKEN";
window.ZiggeoKeyVideo = "YOUR_DEMO_VIDEO_KEY"; // this one shouldn't include the underscore
window.ZiggeoKeyAudio = "YOUR_DEMO_AUDIO_KEY";
window.SourceDemoAudio = "https://file-examples-com.github.io/uploads/2017/11/file_example_WAV_5MG.wav";
window.SourceDemoVideo = "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4";
```
With these you should be able to run most of the demos.

Some browsers don't allow accessing the camera directly from the file system or from insecure locations. In such cases you'll need to access the pages from the https server.
There is an example on the file `server.js`. If you have npm installed and an SSL certificate (it can be self signed) you can run it with the following steps:
- Create a `config.js` file inside the demos folder
- The file should contain the following:
```js
module.exports = {
    key_path: "YOUR_KEY_PATH",
    file_path: "YOUR_FILE_PATH"
};
```
- Go to demos folder and install dependencies
```bash
cd demos/
npm install express
```

## Running the server
```bash
node server.js
```