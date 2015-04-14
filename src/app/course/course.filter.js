'use strict';

angular.module('1yd-coach')
  .filter('courseType', function() {
    return function(input) {
      switch (input) {
        case 'OneToOne':
          input = '一对一';
          break;
        case 'OneToMany':
          input = '一对多';
          break;
      }
      return input;
    }
  });
