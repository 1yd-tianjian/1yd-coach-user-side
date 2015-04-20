'use strict';

angular.module('1yd-coach')

.controller('CourseListCtrl', function($scope, $stateParams, courseService, meatDataService) {

  //页面初始化
  var vm = $scope.vm = {
    mask: false,
    pageInfo: {}
  };

  //筛选条切换
  $scope.currentFilter = null;
  $scope.setFilter = function(filter) {
    $scope.currentFilter = filter;
    vm.mask = true;
  };

  meatDataService.meatData().then(function(data){
    console.log(data);
    //运动类型
    $scope.categories = data.categories;
    //排序方式
    $scope.sorts = data.sorts;
    //行政区
    $scope.districts = data.city_districts[0].districts;
    //商圈
    $scope.cbds = data.city_districts[0].districts[0].district_cbds[0];
    console.log($scope.cbds);
  });

  //隐藏遮罩层
  function hideMask() {
    vm.mask = false;
    $scope.currentFilter = null;
  };
  $scope.hideMask = function() {
    hideMask();
  };

  //初始化教练列表
  $scope.courses = [];

  var param = {
    size: 10,
    page: 0,
    category_id: null,
    gender: null
  };

  /**
   * 查询教练列表
   * @param  {[obj]} param [page,size,category_id,gender]
   * @return {[arr]}       [coachList]
   */
  courseService.allCourses(param).then(function(res) {
    vm.pageInfo = _.assign(vm.pageInfo, res.info);
    $scope.courses = res;
  }, function(err) {
    console.log(err);
  });

  // 刷新列表
  $scope.doRefresh = function() {
    param.page = 0;
    courseService.allCourses(param).then(function(res) {
        vm.pageInfo = _.assign(vm.pageInfo, res.info);
        $scope.courses = res;
      })
      .finally(function() {
        $scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
      });
  };

  // 加载更多
  $scope.loadMore = function() {
    param.page += 1;
    if (!vm.pageInfo.last) {
      courseService.allCourses(param).then(function(res) {
        vm.pageInfo = _.assign(vm.pageInfo, res.info);
        $scope.courses = $scope.courses.concat(res);
        $scope.$broadcast('scroll.infiniteScrollComplete'); // Stop the ion-refresher from spinning
      });
    };
  };

  // 页面回收机制
  $scope.$on('$stateChangeSuccess', function() {
    hideMask();
  });
  
})

.controller('CourseDetailCtrl', function($scope, $stateParams, $ionicModal, courseService) {
  
  var courseId = $stateParams.courseId;

  //选择场地modal
  $ionicModal.fromTemplateUrl('app/components/modals/chooseField/chooseField.html', {
    scope: $scope,
    animation: 'slide-in-up',
    hardwareBackButtonClose: true
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //弹出选择场地modal
  $scope.openChooseField = function() {
    $scope.modal.show();
  };

  //关闭选择场地modal
  $scope.closeChooseField = function() {
    $scope.modal.hide();
  };

  //获取单个教练数据
  courseService.oneCourse(courseId).then(function(res) {
    console.log(res);
    $scope.course = res;
  }, function(err) {
    console.log(err);
  });

});
