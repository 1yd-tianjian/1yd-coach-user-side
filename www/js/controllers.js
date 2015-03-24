angular.module('1yd-coach.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('CoachesCtrl', function($scope, $ionicPopover, Coaches, Restangular) {

    // console.log(Restangular);

    var allCoaches = Restangular.all('coaches').getList();
    allCoaches.then(function(res){
        console.log(res);
    },function(err){
        console.log(err);
    });
	$ionicPopover.fromTemplateUrl('templates/cate.html', {
	    scope: $scope,
	  }).then(function(popover) {
	    $scope.popover = popover;
	  });

	$scope.selectCate = function($event) {
    $scope.popover.show($event);
  };



    $scope.coaches = Coaches.all();
    $scope.remove = function(coach) {
        Coaches.remove(coach);
    }
})

.controller('CoachDetailCtrl', function($scope, $stateParams, $ionicNavBarDelegate, $ionicHistory, Coaches) {
    $scope.coach = Coaches.get($stateParams.coachId);

});
