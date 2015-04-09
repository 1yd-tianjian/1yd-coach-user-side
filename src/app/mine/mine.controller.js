'use strict';

angular.module('1yd-coach')

.controller('MineCtrl', function($scope, toastr) {

  $scope.showToast = function(){
    toastr.error('Hello world!');
  };

});