/*jshint funcscope:true*/
window.createGame = function () {
	var tileSize = 100;
	var game = new Phaser.Game(tileSize * 4, tileSize * 4, Phaser.CANVAS, 'gameCanvas', {preload: onPreload, create: onCreate});
	var fieldArray = new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
	var tileSprites;
    var upKey;
    var downKey;
    var leftKey;
    var rightKey;
    var colors = {
        2:0xFFFFFF,
        4:0xFFEEEE,
        8:0xFFDDDD,
        16:0xFFCCCC,
        32:0xFFBBBB,
        64:0xFFAAAA,
        128:0xFF9999,
        256:0xFF8888,
        512:0xFF7777,
        1024:0xFF6666,
        2048:0xFF5555,
        4096:0xFF4444,
        8192:0xFF3333,
        16384:0xFF2222,
        32768:0xFF1111,
        65536:0xFF0000
    };
    var canMove = false;

	function onPreload() {
		game.load.image('tile', '/app/assets/images/tile.png');
	}
	
	function onCreate() {
		upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		upKey.onDown.add(moveUp,this);
		downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
		downKey.onDown.add(moveDown,this);
		leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
		leftKey.onDown.add(moveLeft,this);
		rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
		rightKey.onDown.add(moveRight,this);
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
		fadeIn.to({alpha: 1}, 250);
		fadeIn.onComplete.add(function () {
			updateNumbers();
			canMove=true;
		});
		fadeIn.start();
	}
	
	function toRow (n) {
		return Math.floor(n / 4);
	}
	
	function toCol (n) {
		return n % 4;	
	}
	
	function updateNumbers () {
		tileSprites.forEach(function (item) {
			console.log('item', item);
			var value = fieldArray[item.pos];
			item.getChildAt(0).text = value;
			item.tint = colors[value];
		});	
	}
	
	function moveLeft () {
        if(canMove){
            canMove = false;
            var moved = false;
            tileSprites.sort('x',Phaser.Group.SORT_ASCENDING);
			tileSprites.forEach(function (item){
				var row = toRow(item.pos);
				var col = toCol(item.pos);
				if (col > 0) {
					var remove = false;
					for (var i = col-1; i >= 0; i--) {
						if (fieldArray[row * 4 + i] !== 0) {
							if (fieldArray[row * 4 + i] === fieldArray[row * 4 + col]) {
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
							if(fieldArray[i * 4 + col] === fieldArray[row * 4 + col]) {
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
};