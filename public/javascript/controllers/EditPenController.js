(function(){
   "use strict";
   angular.module("app").controller("EditPenController", EditPenController);
   function EditPenController($state, $stateParams, HomeFactory){
   var vm = this;

// redirect. if you're not supposed to be here, then go home. if the id is not the same as what you want, go home.
   if(!$stateParams.id) $state.go("Home");

   //right now we're just trying to get the specific pen (by the id)
   HomeFactory.getPen($stateParams.id).then(function(res){
      vm.pen = res;
   });

vm.editPen = function(){
   HomeFactory.putPen(vm.pen).then(function(){
      $state.go("Home");
   });
};

   }

})();

// using IFFE
