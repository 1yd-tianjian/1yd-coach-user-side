'use strict';

angular.module('1yd-coach')

.controller('CourseListCtrl', function($scope, $stateParams, Courses) {

  //页面初始化
  var vm = $scope.vm = {
    mask: false
  };

  //筛选条切换
  $scope.currentFilter = null;
  $scope.setFilter = function(filter) {
    $scope.currentFilter = filter;
    vm.mask = true;
  };

  //隐藏遮罩层
  $scope.hideMask = function() {
    vm.mask = false;
    $scope.currentFilter = null;
  };

  //初始化课程列表
  $scope.courses = [];

  //刷新列表
  $scope.doRefresh = function() {
    Courses.allCourses.getList().then(function(res) {
      console.log(res);
      $scope.courses = res;
      $scope.$broadcast('scroll.refreshComplete'); //Stop the ion-refresh from spinning
    }, function(err) {
      console.log(err);
    });
  };

  //进入课程列表，获取课程数据
  $scope.doRefresh();

  //加载更多
  $scope.loadMore = function() {
    $scope.$broadcast('scroll.infiniteScrollComplete'); //Stop the ion-infinite from spinning
  };
  
})

.controller('CourseDetailCtrl', function($scope, $stateParams, Courses) {
  
  var courseId = $stateParams.courseId;

  //获取单个教练数据
  Courses.oneCourse(courseId).get().then(function(res) {
    console.log(res);
    $scope.course = res;
  },function(err){
    console.log(err);
  });

});
