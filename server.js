'use strict()';

var express  = require('express');
var app      = express();
var path = require('path');

// serve files because I didn't use a bloated generator and don't have time to do this a different way
app.use('/app', express.static(path.join(__dirname, '/app')));
app.use('/src', express.static(path.join(__dirname, '/src')));

// mongo stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/2048');
var db = mongoose.connection;
db.on('error', console.error);

var Scores = require('./schemas/scores.js');

// read and write db
app.get('/gethighscore', function () {

});

app.post('/newhighscore', function (score) {

});


// serve the app
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
