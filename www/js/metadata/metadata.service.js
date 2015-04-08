'use strict';

angular.module('1yd-coach')

.factory('MetaData', function(Restangular) {

  return {
    data: Restangular.all('meta-data').getList()
  };
});
