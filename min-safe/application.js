(function() {
	'use strict';

	/**
	* @ngdoc index
	* @name app
	* @description
	* # app
	*
	* Main module of the application.
	*/

	angular.module('ng2048', [
		'ngResource',
		'ngAria',
		'ngMaterial',
		'ngMdIcons',
		'ngMessages',
		'ngCookies',
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'home',
	]);

})();

(function () {
	'use strict';

	/**
	 * @ngdoc configuration file
	 * @name app.config:config
	 * @description
	 * # Config and run block
	 * Configutation of the app
	 */


	angular
		.module('ng2048')
		.config(configure)
		.run(runBlock);

	configure.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', '$mdThemingProvider'];

	function configure($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, $mdThemingProvider) {

		$locationProvider.hashPrefix('!');

		// This is required for Browser Sync to work poperly
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

		$mdThemingProvider.theme('blue')
		    .primaryPalette('blue-grey')
		    .accentPalette('amber')
		    .warnPalette('red')
		    .dark();

	    $mdThemingProvider.theme('lime')
	      .primaryPalette('lime')
	      .accentPalette('orange')
	      .warnPalette('blue');
		    
	    $mdThemingProvider.alwaysWatchTheme(true);
		
		$urlRouterProvider
			.otherwise('/dashboard');
		
	}


	runBlock.$inject = ['$rootScope'];

	function runBlock($rootScope) {
		// 'use strict';
		console.log('AngularJS run() function...');
	}


})();

(function() {
	'use strict';

	/**
	* @ngdoc function
	* @name app.module:homeModule
	* @description
	* # homeModule
	* Module of the app
	*/

	angular.module('home', []);
})();

'use strict()';

	/**
	* @ngdoc function
	* @name app.route:HomeRoute
	* @description
	* # HomeRoute
	* Route of the app
	*/

angular.module('ng2048')
	.config(['$stateProvider', function ($stateProvider) {
		$stateProvider
			
			.state('home', {
				url: '',
				abstract: true,
				templateUrl: 'app/modules/home/home.html',
				controller: 'HomeCtrl',
				controllerAs: 'vm'
			})
			.state('home.dashboard', {
				url:'/dashboard',
				templateUrl: 'app/modules/home/gamecard.html'
			});
			
	}]);

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:HomeCtrl
	* @description
	* # HomeCtrl
	* Controller of the app
	*/

	angular
		.module('ng2048')
		.controller('HomeCtrl', Home);

	Home.$inject = ['$scope', '$mdDialog', '$http'];

	function Home ($scope, $mdDialog, $http) {
		/*jshint validthis: true */
		var vm = this,
			gameOverDialog;
		vm.title = 'Phangular 2048!';
		vm.version = 'v0.5.0';
		vm.default = true;
		vm.userScore = sessionStorage.getItem('2048score') ? parseInt(sessionStorage.getItem('2048score')) : 0;
		vm.name = 'Player 1';

		$http.get('/gethighscore')
			.success(function (data, status, headers, config) {
				console.log('success data hs', data);
				vm.highScore = data;
				$scope.$broadcast('hs', data);
			})
			.error(function(data, status, headers, config) {
				console.log('error getting hs', data);
			});

		$scope.$on('addScore', function (e, score) {
			$scope.$apply(function () {
				vm.userScore += score;
			});
			var params = {name: vm.name, score: vm.userScore};
			if (vm.userScore > vm.highScore.score) {
				$http.post('/updatescore', JSON.stringify(params))
					.success(function (data, status, headers, config) {
						console.log('success data', data);
						$scope.$broadcast('hs', data.score);
					})
					.error(function(data, status, headers, config) {
						console.log('error data', data);
					});				
			}
			sessionStorage.setItem('2048score', vm.userScore);
		});

		$scope.$on('gameOver', function (item, index) {
			gameOverDialog = $mdDialog.alert({
				title: 'Game Over!',
				scope: $scope,
				textContent: 'Your score was ' + vm.userScore + '! Good Job!',
				clickOutsideToClose: true,
				ok: 'Close'
			});
			$mdDialog.show(gameOverDialog);
		});
	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:LayoutCtrl
	* @description
	* # LayoutCtrl
	* Controller of the app
	*/

	angular
		.module('ng2048')
		.controller('LayoutCtrl', Layout);

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog ) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};
	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:SidenavCtrl
	* @description
	* # SidenavCtrl
	* Controller of the app
	*/
	SidenavCtrl.$inject = ['$mdSidenav', '$state', '$mdBottomSheet', '$mdToast', 'MenuService', '$scope', '$rootScope', 'GameLogicService', '$http'];
	angular
		.module('ng2048')
		.controller('SidenavCtrl', SidenavCtrl);

	function SidenavCtrl ($mdSidenav, $state, $mdBottomSheet, $mdToast, MenuService, $scope, $rootScope, GameLogicService, $http) {
		/*jshint validthis: true */
		var vm = this;
		vm.highScore = 0;
		vm.enterName = false;
		vm.playerName = 'Player 1';
		vm.lightTheme = true;

		$scope.$on('hs', function (e, data) {
			vm.navHighScore = data;
		});

		vm.newGame = function () {
			sessionStorage.clear();
			$scope.$parent.vm.userScore = 0;
			GameLogicService.newGame($scope);
		};

		vm.enteringName = function () {
			if (vm.enterName) $scope.$parent.vm.name = vm.playerName;
			vm.enterName = !vm.enterName;
		};

		vm.checkForEnter = function (key) {
			console.log('key', key);
			if (key.which === 13) vm.enteringName();
		};

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		vm.closeSidenav = function() {
			$mdSidenav('left').close();
		};

		vm.changeTheme = function () {
			$scope.$parent.vm.default = !$scope.$parent.vm.default;
			vm.lightTheme = $scope.$parent.vm.default;
		};

		// Close menu on small screen after click on menu item.
		// Only use $scope in controllerAs when necessary; for example, publishing and subscribing events using $emit, $broadcast, $on or $watch.
		$scope.$on('$stateChangeSuccess', vm.closeSidenav);
	}

})();

(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:GameLogicService
	* @description
	* # gameLogic
	* Service of the game logic
	*/

	angular
		.module('ng2048')
		.factory('GameLogicService', Game);

	Game.$inject = [];

	function Game () {
		return {
			createGame: function (scope) {
				this.game(scope);
			},
			game: function (scope) {
				var previousBoard = false;
				if (sessionStorage.getItem('2048board')) {
					previousBoard = sessionStorage.getItem('2048board').split(',').map(function (item) {
						return parseInt(item);
					});
				}
				var tileSize = 100,
					fieldArray = previousBoard ? previousBoard : new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),
					tileSprites,
			    	upKey,
			    	downKey,
			    	leftKey,
			    	rightKey,
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
					/*jshint validthis:true */
					var world = game.world;
			  		game.add.image(0, 0, 'grid').anchor.set(0);
			  		var cursors = game.input.keyboard.createCursorKeys();
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
					if (!previousBoard) {
						addTwo();
						addTwo();						
					} else {
						createOldLayout();
					}
				}
				function addBackTiles (column, row, value, index) {
					var tile = game.add.sprite(toCol(index) * tileSize, toRow(index) * tileSize, 'tile');
					tile.pos = index;
					tile.alpha = 0;
					var text = game.add.text(tileSize / 2,tileSize / 2, value.toString(), {font:'bold 16px Arial',align:'center'});
					text.anchor.set(0.5);
					tile.addChild(text);
					tileSprites.add(tile);
					var fadeIn = game.add.tween(tile);
					fadeIn.to({alpha: 1}, 250);
					fadeIn.onComplete.add(function () {
						updateNumbers();
						canMove = true;
					});
					fadeIn.start();
				}

				function createOldLayout () {
					previousBoard.forEach(function (item, index) {
						var row = Math.floor((index / 4));
						var column = (index % 4);
						if (item !== 0) addBackTiles(column, row, item, index);
					});
				}

				function addTwo () {
					var randomValue;
					while (fieldArray[randomValue] !== 0) {
						randomValue = Math.floor(Math.random() * 16);				
					}
					fieldArray[randomValue] = 2;
					var tile = game.add.sprite(toCol(randomValue) * tileSize, toRow(randomValue) * tileSize, 'tile');
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
					// score += (num * 2);
					scope.$emit('addScore', num * 2);
				}
				
				function updateNumbers () {
					tileSprites.forEach(function (item) {
						var value = fieldArray[item.pos];
						item.getChildAt(0).text = value;
						item.tint = colors[value];
					});	
				}
				
				
				function endMove (m) {
					if (m) {
						addTwo();
			        } else {
			            canMove = true;
					}
					sessionStorage.setItem('2048board', fieldArray);
					// HAHA! Just figured out that this game isnt that simple. Gotta rethink this.
					// var currentEmpties = fieldArray.filter(function (item, index) {
					// 	return item === 0;
					// });
					// if (currentEmpties.length === 0) {
					// 	scope.$emit('gameOver');
					// }
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
				this.Game = game;
				var startState = {preload: onPreload, create: onCreate};
				game.state.add('MainGame', startState);
				game.state.start('MainGame');
				window.game = game;
			},
			newGame: function (scope) {
				this.Game.destroy();
				this.createGame(scope);
			}
		};
	}
})();
(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:menuService
	* @description
	* # menuService
	* Service of the app
	*/

	angular
		.module('ng2048')
		.factory('MenuService', Menu);

	// Inject your dependencies as .$inject = ['$http', '$otherDependency'];
	// function Name ($http, $otherDependency) {...}

	Menu.$inject = ['$http'];

	function Menu($http) {
		// Sample code.

		var menu = [{
			link: '.',
			name: 'This is a Placeholder menu. It disappears when the first module has been created.'
		}];

		return {
			listMenu: function () {
				return menu;
			}
		};

	}

})();

angular.module('ng2048').directive('dlEnterKey', function() {
    return function(scope, element, attrs) {

        element.bind("keydown keypress", function(event) {
            var keyCode = event.which || event.keyCode;

            // If enter key is pressed
            if (keyCode === 13) {
                console.log('enter pressed');
                scope.$apply(function() {
                    scope.$eval(attrs.dlEnterKey);
                });

                event.preventDefault();
            }
        });
    };
});
angular.module('ng2048')
    .directive('gameCanvas', ['GameLogicService',
        function (Game) {
            var linkFn = function (scope, ele, attrs) {
                Game.createGame(scope);
            };
     
            return {
                template: '<div id="gameCanvas"></div>',
                link: linkFn
            };
        }
]);