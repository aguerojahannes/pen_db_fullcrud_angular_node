(function(){
   "use strict";
   angular.module("app").controller("HomeController", HomeController);
   function HomeController(HomeFactory){
   var vm = this;

   HomeFactory.getPens().then(function(res){
      vm.pens = res;
   })

   vm.deletePen = function(pen){ // pen is new variable
      HomeFactory.deletePen(pen).then(function(){
         vm.pens.splice(vm.pens.indexOf(pen),1);
      })
   }

   }

})();
