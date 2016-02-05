'use strict';

angular.module('myApp')
  .factory('Docker',function($http){
    var URL='/api/v1';
    return{
      running:function(){
        return $http.get(URL+'/running');
      },
      exited:function(){
        return $http.get(URL+'/exited');
      }
    }
  });
