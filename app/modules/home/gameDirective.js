angular.module('ng2048')
    .directive('gameCanvas', function ($injector) {
        var linkFn = function (scope, ele, attrs) {
            gameLogic.createGame(scope, $injector);
        };
 
        return {
            template: '<div id="gameCanvas"></div>',
            link: linkFn
        };
});