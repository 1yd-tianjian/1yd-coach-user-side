'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('1yd-coach', ['ionic', 'restangular'])

.run(function($ionicPlatform, $rootScope, $state) {

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

.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
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
        templateUrl: 'app/mine/tab-mine.html'
      }
    }
  })

  // .state('signIn', {
  //     url: '/login',
  //     templateUrl: 'templates/login.html'
  //     }
  // })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');


  // RestangularProvider.setBaseUrl('http://api-test.1yd.me/api/');
  RestangularProvider.setBaseUrl('http://api.1yd.me/api/');

});
