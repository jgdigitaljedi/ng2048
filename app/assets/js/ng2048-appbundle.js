!function(){"use strict";angular.module("ng2048",["ngResource","ngAria","ngMaterial","ngMdIcons","ngMessages","ngCookies","ngAnimate","ngSanitize","ui.router","home"])}(),function(){"use strict";function a(a,b,c,d,e){c.hashPrefix("!"),d.defaults.headers.common["X-Requested-With"]="XMLHttpRequest",e.theme("blue").primaryPalette("blue-grey").accentPalette("amber").warnPalette("red").dark(),e.theme("lime").primaryPalette("lime").accentPalette("orange").warnPalette("blue"),e.alwaysWatchTheme(!0),b.otherwise("/dashboard")}function b(a){console.log("AngularJS run() function...")}angular.module("ng2048").config(a).run(b),a.$inject=["$stateProvider","$urlRouterProvider","$locationProvider","$httpProvider","$mdThemingProvider"],b.$inject=["$rootScope"]}(),function(){"use strict";angular.module("home",[])}(),angular.module("ng2048").config(["$stateProvider",function(a){a.state("home",{url:"","abstract":!0,templateUrl:"app/modules/home/home.html",controller:"HomeCtrl",controllerAs:"vm"}).state("home.dashboard",{url:"/dashboard",templateUrl:"app/modules/home/gamecard.html"})}]),function(){"use strict";function a(a,b){var c,d=this;d.title="Phangular 2048!",d.version="v0.5.0",d["default"]=!0,d.userScore=0,a.$on("addScore",function(b,c){a.$apply(function(){d.userScore=c})}),a.$on("gameOver",function(e,f){c=b.alert({title:"Game Over!",scope:a,textContent:"Your score was "+d.userScore+"! Good Job!",clickOutsideToClose:!0,ok:"Close"}),b.show(c)})}angular.module("ng2048").controller("HomeCtrl",a),a.$inject=["$scope","$mdDialog"]}(),function(){"use strict";function a(a,b,c,d,e){var f=this;f.toggleSidenav=function(b){a(b).toggle()}}angular.module("ng2048").controller("LayoutCtrl",a),a.$inject=["$mdSidenav","$cookies","$state","$mdToast","$mdDialog"]}(),function(){"use strict";function a(a,b,c,d,e,f,g,h){var i=this;i.highScore=0,i.enterName=!1,i.playerName="Player 1",i.lightTheme=!0,i.newGame=function(){h.newGame(f)},i.toggleSidenav=function(b){a(b).toggle()},i.closeSidenav=function(){a("left").close()},i.changeTheme=function(){f.$parent.vm["default"]=!f.$parent.vm["default"],i.lightTheme=f.$parent.vm["default"]},f.$on("$stateChangeSuccess",i.closeSidenav)}a.$inject=["$mdSidenav","$state","$mdBottomSheet","$mdToast","MenuService","$scope","$rootScope","GameLogicService"],angular.module("ng2048").controller("SidenavCtrl",a)}(),function(){"use strict";function a(){return{createGame:function(a){this.game(a)},game:function(a){function b(){y.load.image("tile","/app/assets/images/tile.png"),y.load.image("grid","/app/assets/images/grid.png")}function c(){y.world;y.add.image(0,0,"grid").anchor.set(0);var a=y.input.keyboard.createCursorKeys();p=y.input.keyboard.addKey(Phaser.Keyboard.W),p.onDown.add(k,this),a.up.onDown.add(k,this),q=y.input.keyboard.addKey(Phaser.Keyboard.S),q.onDown.add(n,this),a.down.onDown.add(n,this),r=y.input.keyboard.addKey(Phaser.Keyboard.A),r.onDown.add(l,this),a.left.onDown.add(l,this),s=y.input.keyboard.addKey(Phaser.Keyboard.D),s.onDown.add(m,this),a.right.onDown.add(m,this),o=y.add.group(),d(),d()}function d(){for(var a;0!==u[a];)a=Math.floor(16*Math.random());u[a]=2;var b=y.add.sprite(f(a)*t,e(a)*t,"tile");b.pos=a,b.alpha=0;var c=y.add.text(t/2,t/2,"2",{font:"bold 16px Arial",align:"center"});c.anchor.set(.5),b.addChild(c),o.add(b);var d=y.add.tween(b);d.to({alpha:1},250),d.onComplete.add(function(){h(),x=!0}),d.start()}function e(a){return Math.floor(a/4)}function f(a){return a%4}function g(b){v+=2*b,a.$emit("addScore",v)}function h(){o.forEach(function(a){var b=u[a.pos];a.getChildAt(0).text=b,a.tint=w[b]})}function i(a){a?d():x=!0}function j(a,b,c,d){u[c]=u[b],u[b]=0,a.pos=c;var g=y.add.tween(a);g.to({x:t*f(c),y:t*e(c)},150),d&&(u[c]*=2,g.onComplete.add(function(){a.destroy()})),g.start()}function k(){if(x){x=!1;var a=!1;o.sort("y",Phaser.Group.SORT_ASCENDING),o.forEach(function(b){var c=e(b.pos),d=f(b.pos);if(c>0){for(var h=!1,i=c-1;i>=0;i--)if(0!==u[4*i+d]){u[4*i+d]===u[4*c+d]&&(g(u[4*i+d]),h=!0,i--);break}c!==i+1&&(a=!0,j(b,4*c+d,4*(i+1)+d,h))}}),i(a)}}function l(){if(x){x=!1;var a=!1;o.sort("x",Phaser.Group.SORT_ASCENDING),o.forEach(function(b){var c=e(b.pos),d=f(b.pos);if(d>0){for(var h=!1,i=d-1;i>=0;i--)if(0!==u[4*c+i]){u[4*c+i]===u[4*c+d]&&(g(u[4*c+i]),h=!0,i--);break}d!==i+1&&(a=!0,j(b,4*c+d,4*c+i+1,h))}}),i(a)}}function m(){if(x){x=!1;var a=!1;o.sort("x",Phaser.Group.SORT_DESCENDING),o.forEach(function(b){var c=e(b.pos),d=f(b.pos);if(3>d){for(var h=!1,i=d+1;3>=i;i++)if(0!==u[4*c+i]){u[4*c+i]===u[4*c+d]&&(h=!0,g(u[4*c+i]),i++);break}d!==i-1&&(a=!0,j(b,4*c+d,4*c+i-1,h))}}),i(a)}}function n(){if(x){x=!1;var a=!1;o.sort("y",Phaser.Group.SORT_DESCENDING),o.forEach(function(b){var c=e(b.pos),d=f(b.pos);if(3>c){for(var h=!1,i=c+1;3>=i;i++)if(0!==u[4*i+d]){u[4*i+d]===u[4*c+d]&&(g(u[4*i+d]),h=!0,i++);break}c!==i-1&&(a=!0,j(b,4*c+d,4*(i-1)+d,h))}}),i(a)}}var o,p,q,r,s,t=100,u=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0),v=0,w={2:16776679,4:16775620,8:16774557,16:16773494,32:16755601,64:16747109,128:16740419,256:16733986,512:15037299,1024:15684432,2048:16007990,4096:15022389,8192:13840175,16384:12986408,32768:12000284,65536:13959168},x=!1,y=new Phaser.Game(4*t,4*t,Phaser.CANVAS,"gameCanvas");this.Game=y;var z={preload:b,create:c};y.state.add("MainGame",z),y.state.start("MainGame"),window.game=y},newGame:function(a){this.Game.destroy(),this.createGame(a)}}}angular.module("ng2048").factory("GameLogicService",a),a.$inject=[]}(),function(){"use strict";function a(a){var b=[{link:".",name:"This is a Placeholder menu. It disappears when the first module has been created."}];return{listMenu:function(){return b}}}angular.module("ng2048").factory("MenuService",a),a.$inject=["$http"]}(),angular.module("ng2048").directive("gameCanvas",["GameLogicService",function(a){var b=function(b,c,d){a.createGame(b)};return{template:'<div id="gameCanvas"></div>',link:b}}]);