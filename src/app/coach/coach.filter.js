'use strict';

angular.module('1yd-coach')
  .filter('coachType', function() {
  	return function(input) {
  		input ? input = '全职' : input = '兼职';
      return input;
    };
  });
