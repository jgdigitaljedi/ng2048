'use strict()';

var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var path = require('path');

app.use('/app', express.static(path.join(__dirname, '/app')));
app.use('/src', express.static(path.join(__dirname, '/src')));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
