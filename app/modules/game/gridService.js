(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.service:gridService
	* @description
	* # gridService
	* Service containing grid logic
	*/

	angular.module('ng2048')
		.service('GridService', GridService);

	function GridService () {

		this.grid   = [];
		this.tiles  = [];
		// Size of the board
		this.size   = 4;
	}

})();