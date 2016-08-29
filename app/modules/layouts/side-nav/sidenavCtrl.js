(function () {
	'use strict';

	/**
	* @ngdoc function
	* @name app.controller:SidenavCtrl
	* @description
	* # SidenavCtrl
	* Controller of the app
	*/
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

		// $http.get('/gethighscore')
		// 	.success(function (data, status, headers, config) {
		// 		console.log('success data hs', data);
		// 	})
		// 	.error(function(data, status, headers, config) {
		// 		console.log('error data hs', data);
		// 	});

		vm.newGame = function () {
			GameLogicService.newGame($scope);
		};

		vm.enteringName = function () {
			if (vm.enterName) $scope.$parent.vm.name = vm.playerName;
			vm.enterName = !vm.enterName;
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
