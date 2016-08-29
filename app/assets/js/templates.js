angular.module('ng2048').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('app/modules/home/gamecard.html',
    "<div flex layout-sm=\"column\" class=\"main-screen\" layout-fill>\n" +
    "    <md-card class=\"text-center main-card\">\n" +
    "        <md-card-content>\n" +
    "            <div class=\"title-area\">\n" +
    "                <h1>{{ vm.title }}</h1>\n" +
    "                <h2>A 2048 game built on Phaser and Angular</h2>\n" +
    "                <span ng-class=\"{'score-board': vm.default, 'score-board-light': !vm.default}\">Score: {{vm.userScore}}</span>\n" +
    "            </div>\n" +
    "            <md-divider class=\"margin-top-20\"></md-divider>\n" +
    "            <div id=\"game-container\" layout-align=\"center center\" flex>\n" +
    "                <game-canvas style=\"margin-top: 10px;\" ng-class=\"{'light-border': !vm.default, 'dark-border': vm.default}\">\n" +
    "                    \n" +
    "                </game-canvas>\n" +
    "            </div>\n" +
    "        </md-card-content>\n" +
    "    </md-card>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/home/home.html',
    "<md-sidenav layout=\"column\" class=\"md-sidenav-left md-whiteframe-z2\" md-component-id=\"left\" md-is-locked-open=\"$mdMedia('gt-md')\">\n" +
    "    <div ng-controller=\"SidenavCtrl as vm\" ng-cloak>\n" +
    "        <md-toolbar class=\"md-tall md-hue-2\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"80\" style=\"margin-top: 10px;\">\n" +
    "                        <div>Phangular 2048</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-list ng-class=\"{ 'white-text': !vm.lightTheme }\">\n" +
    "            <md-list-item>\n" +
    "                <div class=\"inset\" ng-click=\"vm.enteringName()\">\n" +
    "                    <ng-md-icon icon=\"face\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <span ng-switch=\"vm.enterName\">\n" +
    "                    <p ng-switch-when=\"false\"> {{vm.playerName}} </p>\n" +
    "                    <input placeholder=\"{{vm.playerName}}\" ng-switch-when=\"true\" ng-model=\"vm.playerName\" />\n" +
    "            </md-list-item>\n" +
    "            <md-list-item ng-click=\"vm.newGame()\">\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"grid_on\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> New Game </p>\n" +
    "            </md-list-item>\n" +
    "            <md-list-item ng-click=\"vm.changeTheme()\">\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"color_lens\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> Change Theme </p>\n" +
    "            </md-list-item>\n" +
    "            <md-divider></md-divider>\n" +
    "            <md-list-item>\n" +
    "                <div class=\"inset\">\n" +
    "                    <ng-md-icon icon=\"grade\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <div layout=\"column\">\n" +
    "                    <span style=\"font-weight: bold !important;\"> High Score</span>\n" +
    "                    <span>{{vm.navHighScore.score}}</span>\n" +
    "                    <span>{{vm.navHighScore.name}}</span>\n" +
    "                    <span>{{vm.navHighScore.dateTime}}</span>\n" +
    "                </div>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n" +
    "    </div>\n" +
    "</md-sidenav>\n" +
    "\n" +
    "<div layout=\"column\" class=\"relative\" layout-fill role=\"main\" ng-controller=\"LayoutCtrl as layout\" ng-cloak>\n" +
    "    <md-toolbar>\n" +
    "        <div class=\"md-toolbar-tools\">\n" +
    "            <md-button ng-click=\"layout.toggleSidenav('left')\" hide-gt-md aria-label=\"Menu\">\n" +
    "                <ng-md-icon icon=\"menu\"></ng-md-icon>\n" +
    "            </md-button>\n" +
    "            <!-- <h3>ng2048</h3> -->\n" +
    "            <span flex></span>\n" +
    "        </div>\n" +
    "    </md-toolbar>\n" +
    "    <md-content layout=\"column\" flex md-scroll-y style=\"background-color:#DCDCDC\">\n" +
    "        <div ui-view></div>\n" +
    "    </md-content>\n" +
    "</div>\n"
  );


  $templateCache.put('app/modules/layouts/main-page/main-page.html',
    "<md-content flex md-scroll-y>\n" +
    "    <ui-view layout=\"column\" layout-fill layout-padding>\n" +
    "\n" +
    "\n" +
    "    </ui-view>\n" +
    "</md-content>\n"
  );


  $templateCache.put('app/modules/layouts/side-nav/sidenav.html',
    "        <md-toolbar class=\"md-tall md-hue-2\">\n" +
    "            <div layout=\"column\" class=\"md-toolbar-tools-bottom inset\">\n" +
    "                <div layout=\"row\">\n" +
    "                    <div flex=\"20\">\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </md-toolbar>\n" +
    "        <md-list>\n" +
    "            <md-list-item ng-repeat=\"item in vm.menu\" ng-click=\"vm.navigateTo(item.link)\" >\n" +
    "                <div class=\"inset\" ng-show=\"item.icon\">\n" +
    "                    <ng-md-icon icon=\"{{item.icon}}\"></ng-md-icon>\n" +
    "                </div>\n" +
    "                <p> {{ item.name }}</p>\n" +
    "            </md-list-item>\n" +
    "        </md-list>\n"
  );

}]);
