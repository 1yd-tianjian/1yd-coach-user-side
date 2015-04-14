'use strict';

angular.module('1yd-coach')

.service('Courses', function(Restangular) {

  this.allCourses = Restangular.all('courses');

  this.oneCourse = function(id) {
    return Restangular.one('courses', id);
  };
});
