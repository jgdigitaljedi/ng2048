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

	Layout.$inject = ['$mdSidenav', '$cookies', '$state', '$mdToast', '$mdDialog', '$http'];

	/*
	* recommend
	* Using function declarations
	* and bindable members up top.
	*/

	function Layout($mdSidenav, $cookies, $state, $mdToast, $mdDialog, $http) {
		/*jshint validthis: true */
		var vm = this;

		vm.toggleSidenav = function (menuId) {
			$mdSidenav(menuId).toggle();
		};

		var location = '30.314574,-97.756780'; // for dev until I write geoloaction stuff

		$http.get('/getconditions/' + location)
			.success(function(data, status, headers, config) {
				console.log('response', data);
				vm.geoTemp = data.current_observation.temp_f;
                vm.geoIcon = '/app/assets/images/' + data.current_observation.icon + '.png';
                console.log('temp f', vm.geoTemp);
                vm.showWeather = true;
			}).error(function(data, status, headers, config) {
				console.log('error', data);
				vm.getoTemp = false;
				vm.geoIcon = false;
				vm.showWeather = false;
			});
	}

})();
