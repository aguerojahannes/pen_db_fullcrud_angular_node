(function(){
   "use strict";
   angular.module("app")
   .controller("AddPenController", AddPenController);

   function AddPenController(HomeFactory,$state){
      var vm = this;
      vm.pen = {};
      vm.createPen = function(){
         HomeFactory.postPen(vm.pen).then(function(){
            $state.go('Home');
         });
      };
   }; 
})();
