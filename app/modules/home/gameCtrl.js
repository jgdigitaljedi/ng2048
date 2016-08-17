(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:GameCtrl
	* @description
	* # GameCtrl
	* Controller for game logic
	*/

	angular
		.module('ng2048')
		.controller('GameCtrl', Game);

	Game.$inject = [];

	function Game (GameManager) {
		/*jshint validthis: true */
		var gc = this;
		this.game = GameManager;

		gc.game = {
			currentScore: 0
		};

	}

})();