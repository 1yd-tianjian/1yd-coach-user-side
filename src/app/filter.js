'use strict';

angular.module('1yd-coach')

.filter('time', function() {
  return function(input) {
    if (typeof input !== 'undefined') {
      return moment(input, 'HH:mm:ss.SSS').format('HH:mm');
    }
  };
})

.filter('price', function(currencyFilter) {
  return function(input) {
    if (typeof input == 'number') {
      return currencyFilter(input / 100, '￥');
    }
  }
});
