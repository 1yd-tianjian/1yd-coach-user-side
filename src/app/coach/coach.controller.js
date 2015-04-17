'use strict';

angular.module('1yd-coach')

.controller('CoachListCtrl', function($scope, coachService) {

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

  //隐藏遮罩层
  function hideMask() {
    vm.mask = false;
    $scope.currentFilter = null;
  };
  $scope.hideMask = function() {
    hideMask();
  };

  // 收藏教练
  $scope.collect = function (){
    alert('sfds');
    return;
  };

  //初始化教练列表
  $scope.coaches = [];

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
  coachService.allCoaches(param).then(function(res) {
    vm.pageInfo = _.assign(vm.pageInfo, res.info);
    $scope.coaches = res;
  }, function(err) {
    console.log(err);
  });

  // 刷新列表
  $scope.doRefresh = function() {
    param.page = 0;
    coachService.allCoaches(param).then(function(res) {
        vm.pageInfo = _.assign(vm.pageInfo, res.info);
        $scope.coaches = res;
      })
      .finally(function() {
        $scope.$broadcast('scroll.refreshComplete'); // Stop the ion-refresher from spinning
      });
  };

  // 加载更多
  $scope.loadMore = function() {
    param.page += 1;
    if (!vm.pageInfo.last) {
      coachService.allCoaches(param).then(function(res) {
        vm.pageInfo = _.assign(vm.pageInfo, res.info);
        $scope.coaches = $scope.coaches.concat(res);
        $scope.$broadcast('scroll.infiniteScrollComplete'); // Stop the ion-refresher from spinning
      });
    };
  };

  // 页面回收机制
  $scope.$on('$stateChangeSuccess', function() {
    hideMask();
  });

})



.controller('CoachDetailCtrl', function($scope, $stateParams, $ionicModal, coachService) {
  var coachId = $stateParams.coachId;

  //获取单个教练数据
  var coachPromise = coachService.oneCoach(coachId);
  $scope.coach = coachPromise.$object;
  $scope.courses = coachPromise.call('getCoachCourseList', coachId).$object;
  console.log($scope.courses);
  console.log('courses');
  console.log(coachPromise);
  // coachService.oneCoach(coachId).then(function(res) {
  //   $scope.courses = res.getCoachCourseList(coachId).$object;
  //   $scope.coach = res;
  // }, function(err) {
  //   console.log(err);
  // });

  //初始化推荐教练列表
  $scope.reCoaches = [];

  var param = {
    size: 4,
    page: 0,
    category_id: null,
    gender: null
  };

  /**
   * 查询推荐教练列表
   * @param  {[obj]} param [page,size,category_id,gender]
   * @return {[arr]}       [coachList]
   */
  coachService.allCoaches(param).then(function(res) {
    console.log(res);
    $scope.reCoaches = res;
  }, function(err) {
    console.log(err);
  });

  //课程安排modal
  $ionicModal.fromTemplateUrl('app/components/modals/timetable/timetable.html', {
    scope: $scope,
    animation: 'slide-in-up',
    hardwareBackButtonClose: true
  }).then(function(modal) {
    $scope.modal = modal;
  });

  //弹出课程安排modal
  $scope.openSchedule = function() {
    $scope.modal.show();
  };

  //关闭课程安排modal
  $scope.closeSchedule = function() {
    $scope.modal.hide();
  };

  //教练Tab
  $scope.currentTab = "tab1";
  $scope.setTab = function(tab) {
    $scope.currentTab = tab;
  };

});
