var fs = require('fs');
var http = require('http');
var https = require('https');
var path = require('path');
var config;
try { config = require('./config'); } catch(e) {}
var express = require('express');
var serveIndex = require('serve-index');
var app = express();

var privateKey  = config && fs.readFileSync(config.key_path);
var certificate = config && fs.readFileSync(config.cert_path);
var credentials = {key: privateKey, cert: certificate};
var publicdir = __dirname;

// CORS policy
app.use(function(req, res, next) {
	res.setHeader('Acces-Control-Allow-Origin','*');
	res.setHeader('Acces-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
	res.setHeader('Acces-Contorl-Allow-Methods','Content-Type','Authorization');
	next();	
});

// Make html pages accessible without extension
app.use(function(req, res, next) {
	if (req.path.indexOf('.') === -1) {
		var file = publicdir + req.path + '.html';
		fs.exists(file, function(exists) {
			if (exists)
			req.url += '.html';
			next();
		});
	}
	else
		next();
});

app.use(express.static(__dirname));
app.use(serveIndex(__dirname, { icons: true }));
app.use(express.static(path.join(__dirname, '..')));

var httpsServer = https.createServer(credentials, app);

var httpServer = http.createServer(app);

httpServer.listen(8001, () => {
	console.log("Listening on port 8001 (http)");
	console.log("http://localhost:8001/");
})

if (config) httpsServer.listen(443, () => {
	console.log("Listening on port 443 (https)");
	console.log("https://localhost:443/");
});