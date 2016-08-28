'use strict()';

var express  = require('express');
var app      = express();
var path = require('path');
var bodyParser = require('body-parser');
var moment = require('moment');

var initialHighScore = {};
var dateFormat = 'MM/DD/YYYY hh:mm a';

app.use(bodyParser.json());

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
			var newScore = {score: 0, dateTime: new Date(), name: 'Player 1', which: 'highest'};
			var initHs = new HighScores(newScore);
			initHs.save(function (error) {
				if (error) throw err;
			});
			initialHighScore = newScore;
		} else {
			initialHighScore = item;
		}
	});

	HighScores.findOne({which: 'currentGame'}, function (err, item) {
		if (!item || err) {
			item = {score: 0, dateTime: new Date(), name: 'Player 1', which: 'currentGame'};
			var initCgs = new HighScores(item);
			initCgs.save(function (error) {
				if (error) throw err;
			});
		}
	});	
});


// read and write db
app.get('/gethighscore', function (req, res) {
	// HighScores.find(function (err, scores) { //for debugging
	// 	console.log('scores: ', scores);
	// });
	HighScores.findOne( {which: 'highest'}, function (err, item) {
		console.log('the item', item);
		item.dateTime = moment(item.dateTime).format(dateFormat);
		initialHighScore = item.score;
		res.send(item);
	});
});

app.post('/updatescore', function (req, res) {
	console.log(req.body.name);
	var newHigh = false;
	HighScores.findOne({which: 'currentGame'}, function (error, item) {
		item.score = req.body.score;
		item.dateTime = new Date();
		item.name = req.body.name;
		item.update(function (err) {
			if (err) throw err;
		});
	});
	if (initialHighScore <= req.body.score) {
		HighScores.findOne( {which: 'highest'}, function (error, item) {
			newHigh = true;
			item.score = req.body.score;
			item.dateTime = new Date();
			item.name = req.body.name;
			item.update(function (err) {
				if (err) throw err;
			});
		});
	}
	res.send({error: false, newHigh: newHigh});
});


// serve the app
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000);