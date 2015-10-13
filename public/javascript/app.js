(function(){
   "use strict";
   angular.module("app", ["ui.router"]).config(config);

   function config($stateProvider, $urlRouterProvider){
      $stateProvider.state('Home', {
         url: "/",
         templateUrl: "/templates/home.html"
      }).state('CreatePen', {
         url: "/Create",
         templateUrl: "/templates/createPen.html"
      }).state('EditPen', {
         url: "/Edit/:id",
         templateUrl: "/templates/editPen.html"
      });
      $urlRouterProvider.otherwise("/");
   }
})();
