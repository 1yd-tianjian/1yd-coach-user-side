angular.module('1yd-coach.controllers')

.controller('CourseListCtrl', function($scope, $ionicPopover, Courses) {

  $ionicPopover.fromTemplateUrl('templates/cate.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.selectCate = function($event) {
    $scope.popover.show($event);
  };



  $scope.courses = Courses.all();
  $scope.remove = function(course) {
    Courses.remove(course);
  }
})

.controller('CourseDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Courses) {
  $scope.course = Courses.get($stateParams.courseId);

});
