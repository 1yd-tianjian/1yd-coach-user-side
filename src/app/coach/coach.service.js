'use strict';

angular.module('1yd-coach')

.service('Coaches', function(Restangular) {

  this.allCoaches = Restangular.all('coaches');

  this.oneCoach = function(id) {
    return Restangular.one('coaches', id);
  };


});
