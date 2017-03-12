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
