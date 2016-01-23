'use strict';

//////////////////////////////
// Requires
//////////////////////////////
var express = require('express'),
    cfenv = require('cfenv'),
    // watson = require('watson-developer-cloud'),
    path = require('path');

//////////////////////////////
// App Variables
//////////////////////////////
var app = express(),
    appEnv = cfenv.getAppEnv();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.send('./src/index.html');
});

//////////////////////////////
// Start the server
//////////////////////////////
app.listen(appEnv.port, function () {
  console.log('Server starting on ' + appEnv.url);
});
