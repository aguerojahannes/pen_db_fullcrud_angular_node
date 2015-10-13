(function(){
   "use strict";
   angular.module("app").factory("HomeFactory", HomeFactory);
   function HomeFactory($http, $q){
      var o = {};

//HomeController
      o.getPens = function(){
         var q = $q.defer();
         $http.get("/api/v1/pens").then(function(res){
            q.resolve(res.data); // we we console.log res we get quite a bit of information, including .data. if we do res.data , we get back the object.
         });
         return q.promise;
      }

      o.deletePen = function(pen){
         var q = $q.defer();
         $http.delete("/api/v1/pens/" + pen.id).then(function(){ // pen.id is from the pen.js file
            q.resolve();
         })
         return q.promise;
      }

// getting pens by id (vs. above getPens if getting all the pens to display)
      o.getPen = function(id){
         var q = $q.defer();
         $http.get("/api/v1/pens/" + id).then(function(res){
            q.resolve(res.data);
         });
         return q.promise;
      }

// AddPenController
      o.postPen = function(pen){
         var q = $q.defer()
         $http.post("/api/v1/pens", pen).then(function(res){
            console.log(res);
            q.resolve(res.data);
         });
         return q.promise;
      }

      o.putPen = function(pen){
         var q = $q.defer();
         $http.put("/api/v1/pens/" + pen.id, pen).then(function(){
            q.resolve();
         });
         return q.promise;
      }

      return o;
   }
})()
