'use strict';

angular.module('1yd-coach')

.controller('CoachListCtrl', function($scope, Coaches) {

  //页面初始化
  $scope.flag = false;

  //筛选条切换
  $scope.currentFilter = null;
  $scope.setFilter = function(filter) {
    $scope.currentFilter = filter;
    $scope.flag = true;
  };


  //初始化教练列表
  $scope.coaches = [];

  //刷新列表
  $scope.doRefresh = function() {
    Coaches.allCoaches.getList().then(function(res) {
      $scope.coaches = res;
      $scope.$broadcast('scroll.refreshComplete'); //Stop the ion-refresh from spinning
    }, function(err) {
      console.log(err);
    });
  };

  //进入教练列表，获取教练数据
  $scope.doRefresh();

  // 获取教练数据
  // Coaches.allCoaches.getList().then(function(res) {
  //   $scope.coaches = res;
  // }, function(err) {
  //   console.log(err);
  // });

  //加载更多
  $scope.loadMore = function() {
    $scope.$broadcast('scroll.infiniteScrollComplete'); //Stop the ion-infinite from spinning
  };

  //监听路由改变成功调用loadMore方法
  // $scope.$on('$stateChangeSuccess', function() {
  //   console.log('stateChangeSuccess');
  //   $scope.doRefresh();
  // });
})



.controller('CoachDetailCtrl', function($scope, $stateParams, $ionicModal, Coaches) {
  // $scope.coach = Coaches.get($stateParams.coachId);
  // 
  // console.log($stateParams.coachId);




  Coaches.oneCoach.get().then(function(res) {
    console.log(res);
    $scope.coach = res;
  }, function(err) {
    console.log(err);
  });

  $ionicModal.fromTemplateUrl('app/components/modals/timetable/timetable.html', {
    scope: $scope,
    animation: 'slide-in-up',
    hardwareBackButtonClose: true
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openSchedule = function() {
    $scope.modal.show();


  $scope.closeSchedule = function() {
      $scope.modal.hide();
    };
  }

  // init tab
  $scope.currentTab = "tab1";
  $scope.setTab = function(tab) {
    $scope.currentTab = tab;
  };

});
