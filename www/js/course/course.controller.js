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
    $scope.remove = function(coach) {
        Courses.remove(coach);
    }
})

.controller('CourseDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Courses) {
    $scope.course = Courses.get($stateParams.coachId);

});