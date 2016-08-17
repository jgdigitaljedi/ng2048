angular.module('ng2048')
.directive('grid', function() {
  	return {
    	restrict: 'A',
    	require: 'ngModel',
    	scope: {
      		ngModel: '='
    	},
    	templateUrl: 'app/modules/game/grid.html'
  	};
});