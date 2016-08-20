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

	Home.$inject = ['$scope'];

	function Home ($scope) {
		/*jshint validthis: true */
		var vm = this;
		vm.title = 'Phangular 2048!';
		vm.version = 'v0.5.0';
		vm.default = true;
		vm.userScore = 0;

		$scope.$on('addScore', function (e, score) {
			console.log('addScoreCalled', score);
			$scope.$apply(function () {
				vm.userScore = score;
			});
		});
	}

})();
