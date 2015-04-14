'use strict';

angular.module('1yd-coach', ['ionic', 'restangular', 'ngAnimate', 'pasvaz.bindonce', 'angular-loading-bar', 'toastr'])

.run(function($ionicPlatform, $rootScope, $state) {

  //根据页面控制Tab栏隐藏
  $rootScope.$on('$ionicView.beforeEnter', function() {
    $rootScope.hideTabs = false;
    if ($state.current.name === 'tab.coach-detail' || $state.current.name === 'tab.course-detail') {
      $rootScope.hideTabs = true;
    }
  });

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/**
 * angular-toast
 * toastr.iconClasses('Hello world!')
 */
.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    allowHtml: false,
    closeButton: false,
    closeHtml: '<button>&times;</button>',
    containerId: 'toast-container',
    extendedTimeOut: 1000,
    iconClasses: {
      error: 'toast-error',
      info: 'toast-info',
      success: 'toast-success',
      warning: 'toast-warning'
    },
    maxOpened: 0,
    messageClass: 'toast-message',
    newestOnTop: true,
    onHidden: null,
    onShown: null,
    positionClass: 'toast-bottom-center',
    preventDuplicates: false,
    progressBar: false,
    tapToDismiss: true,
    target: 'body',
    templates: {
      toast: 'directives/toast/toast.html',
      progressbar: 'directives/progressbar/progressbar.html'
    },
    timeOut: 500,
    titleClass: 'toast-title',
    toastClass: 'toast'
  });
})


/**
 * loadingBar
 */
.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
  cfpLoadingBarProvider.includeBar = true;
}])

//router
.config(function($stateProvider, $urlRouterProvider, RestangularProvider, CONFIG) {

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

  // RestangularProvider.setBaseUrl('http://192.168.2.133:8081/ROOT/api');
  // RestangularProvider.setBaseUrl('http://192.168.2.50');
  RestangularProvider.setBaseUrl(CONFIG.apiUrl);

  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'app/components/tab/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'app/home/tab-home.html'
      }
    }
  })

  .state('tab.coaches', {
    url: '/coaches',
    views: {
      'tab-coach': {
        templateUrl: 'app/coach/tab-coaches.html',
        controller: 'CoachListCtrl'
      }
    }
  })

  .state('tab.coach-detail', {
    url: '/coaches/:coachId',
    views: {
      'tab-coach': {
        templateUrl: 'app/coach/coach-detail.html',
        controller: 'CoachDetailCtrl'
      }
    }
  })

  .state('tab.courses', {
    url: '/courses',
    views: {
      'tab-course': {
        templateUrl: 'app/course/tab-courses.html',
        controller: 'CourseListCtrl'
      }
    }
  })

  .state('tab.course-detail', {
    url: '/courses/:courseId',
    views: {
      'tab-course': {
        templateUrl: 'app/course/course-detail.html',
        controller: 'CourseDetailCtrl'
      }
    }
  })

  .state('tab.mine', {
    url: '/mine',
    views: {
      'tab-mine': {
        templateUrl: 'app/mine/tab-mine.html',
        controller: 'MineCtrl'
      }
    }
  });

  // .state('signIn', {
  //     url: '/login',
  //     templateUrl: 'templates/login.html'
  //     }
  // })




});
