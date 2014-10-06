'use strict';

angular.module('arethusaTranslateGuiApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngAnimate',
  'mm.foundation',
  'infinite-scroll',
  'duScroll',
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
