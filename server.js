'use strict()';

var express  = require('express');
var app      = express();
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');
var Weather = require('./modules/weather.js');

var initialHighScore = {};
var dateFormat = 'MM/DD/YYYY h:mm a';

app.use(bodyParser.json());

// weather and possibly future auxillary calls
app.get('/getconditions', function (req, res) {
	Weather.conditions(req, res);
});

// serve files because I didn't use a bloated generator and don't have time to do this a different way
app.use('/app', express.static(path.join(__dirname, '/app')));
app.use('/src', express.static(path.join(__dirname, '/src')));

// mongo stuff
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/2048');
var HighScores = require('./schemas/scores.js');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	console.log('db connected');
	HighScores.findOne({which: 'highest'}, function (err, item) {
		if (!item || err) {
			console.log('setting initial high score value');
			var newScore = {score: 0, dateTime: moment().format(dateFormat), name: 'Player 1', which: 'highest'};
			var initHs = new HighScores(newScore);
			initHs.save(function (error) {
				if (error) throw err;
			});
		}
	});
});


// read and write db
app.get('/gethighscore', function (req, res) {
	HighScores.findOne( {which: 'highest'}, function (err, item) {
		console.log(item.dateTime);
		res.send(item);
	});
});

app.post('/updatescore', function (req, res) {
	var newHigh = false;
	HighScores.findOneAndUpdate({which: 'highest'},
	{$set: {name: req.body.name, dateTime: moment().format(dateFormat), score: req.body.score}}, {new: true}, function (error, item) {
		res.send({error: false, score: item});
	});
});


// serve the app
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);