# Ziggeo Client SDK 2.32.7


Ziggeo API (https://ziggeo.com) allows you to integrate video recording and playback with only
two lines of code in your site, service or app. This is the Client SDK repository for V2.


## Client-Side Integration

For the client-side integration, you need to add these assets to your html file:

```html 
<link rel="stylesheet" href="build/ziggeo.css" /> 
<script src="build/ziggeo.js"></script> 
```

Then, you need to specify your api token:
```html 
<script>
	var ziggeoApp = new ZiggeoApi.V2.Application({
		token: "APPLICATION_TOKEN"
	}); 
</script>
```

You can specify other global options, [see here](https://ziggeo.com/docs).

To fire up a recorder on your page, add:
```html 
<ziggeorecorder></ziggeorecorder> 
``` 

To embed a player for an existing video, add:
```html 
<ziggeoplayer ziggeo-video='video-token'></ziggeoplayer> 
``` 

For the full documentation, please visit [ziggeo.com](https://ziggeo.com/docs).


## Build yourself

```bash
npm install
npm run build
```


## License

Copyright (c) 2013-2018 Ziggeo
 
Proprietary License
