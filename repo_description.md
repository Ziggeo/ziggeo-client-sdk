# Ziggeo Client SDK Repository

## Overview

The Ziggeo Client SDK repository contains the client-facing JavaScript SDK for integrating Ziggeo's video and audio recording and playback functionality into websites and web applications. This SDK allows developers to easily add powerful media capabilities to their projects with minimal code.

Ziggeo API (https://ziggeo.com) enables video and audio recording, playback, and management with just a few lines of code. This repository provides the JavaScript implementation that can be directly integrated into web applications.

## Repository Structure

The repository is organized as follows:

- **build/**: Contains compiled and minified distributable files ready for production use
  - JavaScript and CSS files that can be directly included in web pages

- **src/**: Contains the source code for the SDK
  - **css/**: Stylesheets for the SDK components
  - **scripts/**: JavaScript source code
  - **fragments/**: Code fragments and partial components
  - **locales/**: Localization files for different languages

- **demos/**: Contains example implementations showing various features of the SDK
  - Multiple HTML files demonstrating different recording and playback scenarios
  - Examples of audio and video integration

- **dist/**: Distribution files for different package managers

- **supplements/**: Additional resources and supplementary files

- **tests/**: Test files for ensuring SDK functionality

- **vendors/**: Third-party dependencies

## How It Works

The Ziggeo Client SDK provides a simple way to integrate video and audio recording and playback into web applications:

1. Developers include the SDK's JavaScript and CSS files in their web pages
2. They initialize the SDK with their Ziggeo API token
3. They add HTML tags for recorders and players where needed
4. The SDK handles all the complex functionality of recording, uploading, and playing media

The SDK uses custom HTML elements (like `<ziggeorecorder>` and `<ziggeoplayer>`) to create a declarative API that's easy to use. It also provides a JavaScript API for more advanced use cases.

## Main Features

The Ziggeo Client SDK offers a comprehensive set of features:

### Video Features
- Easy-to-use video recorder component
- Flexible video player with various options
- Autoplay, loop, and playlist support
- Popup player options
- Video sharing capabilities
- Subtitle and transcription support
- Conditional player display

### Audio Features
- Audio recording and playback
- Audio transcription
- Audio upload capabilities

### Additional Features
- Extensive internationalization support with multiple languages
- Customizable UI through CSS
- Various embedding methods
- Responsive design for different screen sizes

## Setup and Usage

### Basic Integration

1. Include the necessary assets in your HTML file:
   ```html
   <link rel="stylesheet" href="build/ziggeo.css" /> 
   <script src="build/ziggeo.js"></script> 
   ```

2. Initialize the SDK with your API token:
   ```html
   <script>
     var ziggeoApp = new ZiggeoApi.V2.Application({
       token: "YOUR_APPLICATION_TOKEN"
     }); 
   </script>
   ```

3. Add recorder or player components as needed:
   ```html
   <!-- For recording -->
   <ziggeorecorder></ziggeorecorder> 
   
   <!-- For playback -->
   <ziggeoplayer ziggeo-video='video-token'></ziggeoplayer> 
   ```

### Building from Source

If you want to build the SDK yourself:

```bash
npm install
npm run build
```

## Examples

The repository includes numerous examples in the demos folder, demonstrating:

- Basic video recording and playback
- Audio recording and playback
- Player customization (autoplay, playlists, popups)
- Subtitle and transcription integration
- Sharing capabilities
- And many more use cases

These examples serve as a valuable resource for developers looking to integrate specific features into their applications.

## Versioning

The SDK follows semantic versioning, with the version configuration contained in the `package.json` and `bower.json` files. The current version is 2.43.3.

## License

The Ziggeo Client SDK is proprietary software owned by Ziggeo. Copyright (c) 2013-2023 Ziggeo.
