(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:gameService
	* @description
	* # gameService
	* Service containing game logic
	*/

	angular.module('ng2048')
		.service('GameManager', GameManager);

	GameManager.$inject = [];

	function GameManager () {

		this.newGame = function () {};

		this.move = function () {};

		this.updateScore = function (newScore) {};
		
		this.movesAvailable = function () {
			return GridService.anyCellsAvailable() || 
            	GridService.tileMatchesAvailable();
		};

	}

})();
