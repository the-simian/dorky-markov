var path = require('path');
var express = require('express');
// static file compression middleware
var compress = require('compression');
// middleware to allow the general use of PUT and DELETE verbs
var methodOverride = require('method-override');
// logging middleware
var morgan = require('morgan');
// middleware to return X-Response-Time with a response
var responseTime = require('response-time');
var bodyParser = require('body-parser')

var fs = require('fs');


var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(responseTime());
app.use(methodOverride());
app.use(compress());


app.get('/trump-speech', function(req, res){


  fs.readFile('./trump-speech.txt', 'utf8', function(err, speech){
    console.log(speech)
    res.setHeader('Content-Type', 'application/json');
    res.json({data: speech});
  });
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000);

console.log('server started on port: ', process.env.PORT || 3000);

// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 1337;

var cors_proxy = require('cors-anywhere');
cors_proxy.createServer({
    originWhitelist: [], // Allow all origins
  //  requireHeader: ['origin', 'x-requested-with'],
    removeHeaders: ['cookie', 'cookie2']
}).listen(port, host, function() {
    console.log('Running CORS Anywhere on ' + host + ':' + port);
});
