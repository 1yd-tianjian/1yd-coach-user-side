'use strict';

angular.module('1yd-coach.services')

.factory('MetaData', function(Restangular) {

  return {
    data: Restangular.all('meta-data').getList()
  };
});
