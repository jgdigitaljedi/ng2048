angular.module('ng2048')
    .directive('gameCanvas', ['GameLogicService',
        function (Game) {
            var linkFn = function (scope, ele, attrs) {
                Game.createGame(scope);
            };
     
            return {
                template: '<div id="gameCanvas"></div>',
                link: linkFn
            };
        }
]);