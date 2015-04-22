'use strict';

angular.module('1yd-coach')

.controller('HomeCtrl', function($scope, Geolocation, toastr) {
  Geolocation.getLocation();//获取地理位置

  $scope.showToast = function(){
    toastr.error('Hello world!');
  };
  
});
