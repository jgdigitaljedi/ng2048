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

	Home.$inject = ['$scope', '$mdDialog'];

	function Home ($scope, $mdDialog) {
		/*jshint validthis: true */
		var vm = this,
			gameOverDialog;
		vm.title = 'Phangular 2048!';
		vm.version = 'v0.5.0';
		vm.default = true;
		vm.userScore = 0;

		$scope.$on('addScore', function (e, score) {
			$scope.$apply(function () {
				vm.userScore = score;
			});
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
