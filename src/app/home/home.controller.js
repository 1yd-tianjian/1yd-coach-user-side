'use strict';

angular.module('1yd-coach')

.controller('HomeCtrl', function($scope, Geolocation) {
  Geolocation.getLocation();//获取地理位置
  
});
