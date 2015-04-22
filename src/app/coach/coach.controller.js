'use strict';

angular.module('1yd-coach')

.controller('CoachListCtrl', function($scope, coachService, meatDataService) {


  meatDataService.meatData().then(function(data) {
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

  //页面初始化
  var vm = $scope.vm = {
    mask: false,
    isActive: false,
    pageInfo: {}
  };

  //筛选条切换
  $scope.currentFilter = null;
  $scope.setFilter = function(filter) {
    $scope.currentFilter = filter;
    vm.mask = true;
  };

  $scope.setCateFilter = function() {
    angular.forEach($scope.categories, function(category) {
      category.isActive = true;
    });
    // $scope.isActive = true;


    // vm.isActive = true;
  };

  //隐藏遮罩层
  function hideMask() {
    vm.mask = false;
    $scope.currentFilter = null;
  };
  $scope.hideMask = function() {
    hideMask();
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



.controller('CoachDetailCtrl', function($scope, $stateParams, $ionicModal, Restangular, coachService) {



  var coachId = $stateParams.coachId;


  var baseCoaches = Restangular.one('coaches', coachId);

  //获取单个教练数据
  $scope.coach = baseCoaches.get().$object;
  //获取单个教练已开课程列表
  $scope.courses = baseCoaches.getList('courses').$object;
  //获取单个教练评论列表
  $scope.comments = baseCoaches.getList('comments').$object;

  // 收藏教练
  $scope.collect = function() {
    baseCoaches.post('collect', {}).then(function(res) {
      console.log(res);
    }, function(err) {
      console.log(err);
    });
  };


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


  //相册
  $scope.openPhotoSwipe = function() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [{
      src: 'assets/images/coach-img.jpg',
      w: 1024,
      h: 1024,
      title: ' haha'
    }, {
      src: 'assets/images/coach-img.jpg',
      w: 1024,
      h: 1024,
      title: ' huhu'
    }];

    // define options (if needed)
    var options = {
      index: 0,   
      history: false,
      focus: false,
      loop: true,
      showHideOpacity: true,
      bgOpacity: 0.8,

      showAnimationDuration: 1,
      hideAnimationDuration: 1,
      barsSize: {
        top: 44,
        bottom: 'auto'
      },
      timeToIdle: 4000,
      timeToIdleOutside: 1000,
      loadingIndicatorDelay: 1000,
      addCaptionHTMLFn: function(item, captionEl, isFake) {

        if (!item.title) {
          captionEl.children[0].innerHTML = '';
          return false;
        }
        captionEl.children[0].innerHTML = item.title;
        return true;
      },
      closeEl: true,
      captionEl: true,
      fullscreenEl: true,
      zoomEl: true,
      shareEl: true,
      counterEl: true,
      arrowEl: true,
      preloaderEl: true,
      tapToClose: false,
      tapToToggleControls: true,
      clickToCloseNonZoomable: true,
      closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'],
      indexIndicatorSep: ' / ',

    };

    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
  };

});
