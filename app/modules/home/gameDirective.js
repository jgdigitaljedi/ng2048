angular.module('ng2048')
    .directive('gameCanvas', function ($injector) {
        var linkFn = function (scope, ele, attrs) {
            createGame(scope, scope.players, scope.mapId, $injector);
        };
 
        return {
            scope: {
                players: '=',
                mapId: '='
            },
            template: '<div id="gameCanvas"></div>',
            link: linkFn
        };
});