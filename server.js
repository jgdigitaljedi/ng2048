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

var HighScores = require('./schemas/scores.js');

// read and write db
app.get('/gethighscore', function (req, res) {
	HighScores.find({}, function (item) {
		res.send(item);
	});
});

app.post('/newhighscore', function (req, res) {
	// some logic here for getting requesteed object...then...
	HighScores.remove(function (err, count) { // only 1 high score at a time for now
		var newScore = HighScores({
			name: score.name,
			dateTime: score.date,
			score: score.value
		});

		newScore.save(function (err) {
			if (err) throw err;
		});
	});
});


// serve the app
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);
