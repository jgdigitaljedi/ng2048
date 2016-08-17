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
		// Handle the move action
		this.move = function () {};
		// Update the score
		this.updateScore = function (newScore) {};
		// Are there moves left?
		this.movesAvailable = function () {
			return GridService.anyCellsAvailable() || 
            	GridService.tileMatchesAvailable();
		};

	}

})();
