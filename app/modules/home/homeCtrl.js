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
