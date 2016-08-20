/*jshint funcscope:true*/
window.gameLogic = {
	createGame: function () {
		this.game();
	},
	game: function () {
		var tileSize = 100,
			fieldArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
			tileSprites,
	    	upKey,
	    	downKey,
	    	leftKey,
	    	rightKey,
	    	randomValue,
	    	score = 0,
	    	colors = {
		        2:0xFFFDE7,
		        4:0xFFF9C4,
		        8:0xFFF59D,
		        16:0xFFF176,
		        32:0xFFAB91,
		        64:0xFF8A65,
		        128:0xFF7043,
		        256:0xFF5722,
		        512:0xE57373,
		        1024:0xEF5350,
		        2048:0xF44336,
		        4096:0xE53935,
		        8192:0xD32F2F,
		        16384:0xC62828,
		        32768:0xB71C1C,
		        65536:0xD50000
		    },
	    	canMove = false;

		function onPreload() {
			game.load.image('tile', '/app/assets/images/tile.png');
			game.load.image('grid', '/app/assets/images/grid.png');
		}
		
		function onCreate() {
			var world = game.world;
	  		game.add.image(0, 0, 'grid').anchor.set(0);
	  		cursors = game.input.keyboard.createCursorKeys();
			upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
			upKey.onDown.add(moveUp, this);
			cursors.up.onDown.add(moveUp, this);
			downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
			downKey.onDown.add(moveDown, this);
			cursors.down.onDown.add(moveDown, this);
			leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
			leftKey.onDown.add(moveLeft, this);
			cursors.left.onDown.add(moveLeft, this);
			rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
			rightKey.onDown.add(moveRight, this);
			cursors.right.onDown.add(moveRight, this);
			tileSprites = game.add.group();
			addTwo();
			addTwo();
		}

		function addTwo (){
			while (fieldArray[randomValue] !== 0) {
				var randomValue = Math.floor(Math.random() * 16);				
			}
			fieldArray[randomValue] = 2;
			var tile = game.add.sprite(toCol(randomValue) * tileSize,toRow(randomValue) * tileSize, 'tile');
			tile.pos = randomValue;
			tile.alpha = 0;
			var text = game.add.text(tileSize / 2,tileSize / 2, '2', {font:'bold 16px Arial',align:'center'});
			text.anchor.set(0.5);
			tile.addChild(text);
			tileSprites.add(tile);
			var fadeIn = game.add.tween(tile);
			fadeIn.to({alpha: 1}, 300);
			fadeIn.onComplete.add(function () {
				updateNumbers();
				canMove = true;
			});
			fadeIn.start();
		}
		
		function toRow (n) {
			return Math.floor(n / 4);
		}
		
		function toCol (n) {
			return n % 4;	
		}

		function updateScore (num) {
			score += (num * 2);
			console.log('score', score);
		}
		
		function updateNumbers () {
			tileSprites.forEach(function (item) {
				var value = fieldArray[item.pos];
				item.getChildAt(0).text = value;
				item.tint = colors[value];
			});	
		}
		
		function moveLeft () {
	        if (canMove) {
	            canMove = false;
	            var moved = false;
	            tileSprites.sort('x',Phaser.Group.SORT_ASCENDING);
				tileSprites.forEach(function (item){
					var row = toRow(item.pos);
					var col = toCol(item.pos);
					if (col > 0) {
						var remove = false;
						for (var i = col - 1; i >= 0; i--) {
							if (fieldArray[row * 4 + i] !== 0) {
								if (fieldArray[row * 4 + i] === fieldArray[row * 4 + col]) {
									updateScore(fieldArray[row*4+i]);
									remove = true;
									i--;                                             
								}
								break;
							}
						}
						if (col !== i + 1) {
							moved = true;
	                        moveTile(item, row * 4 + col, row * 4 + i + 1, remove);
						}
					}
				});
				endMove(moved);
	        }
		}
		
		function endMove (m) {
			if (m) {
				addTwo();
	        } else {
	            canMove = true;
			}
		}
		
		function moveTile (tile, from, to, remove) {
			fieldArray[to] = fieldArray[from];
	        fieldArray[from] = 0;
	        tile.pos = to;
	        var movement = game.add.tween(tile);
	        movement.to({x:tileSize * (toCol(to)), y:tileSize * (toRow(to))}, 150);
	        if (remove) {
	            fieldArray[to] *= 2;
	            movement.onComplete.add(function () {
	                tile.destroy();
	            });
	        }
	        movement.start();
	    }

	    function moveUp () {
	        if (canMove) {
	            canMove = false;
	            var moved = false;
				tileSprites.sort('y', Phaser.Group.SORT_ASCENDING);
				tileSprites.forEach(function (item) {
					var row = toRow(item.pos);
					var col = toCol(item.pos);
					if (row > 0) {  
	                    var remove = false;
						for (var i = row - 1; i >= 0; i--) {
							if (fieldArray[i * 4 + col] !== 0) {
								if (fieldArray[i * 4 + col] === fieldArray[row * 4 + col]) {
									updateScore(fieldArray[i * 4 + col]);
									remove = true;
									i--;                                             
								}
	                            break;
							}
						}
						if (row !== i + 1) {
	                        moved = true;
	                        moveTile(item, row * 4 + col, (i + 1) * 4 + col, remove);
						}
					}
				});
				endMove(moved);
	         }
		}

	    function moveRight () {
	        if (canMove) {
	            canMove = false;
	            var moved = false;
				tileSprites.sort('x',Phaser.Group.SORT_DESCENDING);
				tileSprites.forEach(function (item) {
					var row = toRow(item.pos);
					var col = toCol(item.pos);
					if (col < 3) {
	                    var remove = false;
						for (var i = col + 1; i <= 3; i++) {
							if (fieldArray[row * 4 + i] !== 0) {
	                            if (fieldArray[row * 4 + i] === fieldArray[row * 4 + col]) {
									remove = true;
									updateScore(fieldArray[row * 4 + i]);
									i++;                                             
								}
								break;
							}
						}
						if (col !== i - 1) {
	                        moved = true;
							moveTile(item, row * 4 + col, row * 4 + i - 1, remove);
						}
					}
				});
				endMove(moved);
			}
		}

	    function moveDown () {
	        if (canMove) {
	            canMove = false;
	            var moved = false;
				tileSprites.sort('y', Phaser.Group.SORT_DESCENDING);
				tileSprites.forEach(function (item) {
					var row = toRow(item.pos);
					var col = toCol(item.pos);
					if (row < 3) {
	                    var remove = false;
						for (var i = row + 1; i <= 3; i++) {
							if (fieldArray[i * 4 + col] !== 0) {
								if (fieldArray[i * 4 + col] === fieldArray[row * 4 + col]) {
									updateScore(fieldArray[i * 4 + col]);
									remove = true;
									i++;                                             
								}
	                            break;
							}
						}
						if (row !== i - 1) {
	                        moved = true;
							moveTile(item, row * 4 + col, (i - 1) * 4 + col, remove);
						}
					}
				});
			    endMove(moved);
	        }
		}

		var game = 
			new Phaser.Game(tileSize * 4, tileSize * 4, Phaser.CANVAS, 'gameCanvas');
		var startState = {preload: onPreload, create: onCreate};
		game.state.add('MainGame', startState);
		game.state.start('MainGame');
		window.game = game;
	},
	newGame: function () {
		window.game.destroy();
		this.createGame();
	}
};