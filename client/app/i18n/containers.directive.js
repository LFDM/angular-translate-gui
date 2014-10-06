'use strict';

angular.module('arethusaTranslateGuiApp').directive('containers', [
  '$timeout',
  function($timeout) {
   return {
     restrict: 'A',
     scope: true,
     link: function(scope, element) {
       scope.$watch('showIndex', function(newVal) {
         if (newVal) {
           scope.itemClass = 'small-12';
           scope.containerClass = 'small-9 large-10';
         } else {
           scope.containerClass = 'small-12';
           scope.itemClass = 'small-6';
         }
         scope.cloak = true;
         $timeout(function() {
           scope.cloak = false;
         }, 600);
       });
     },
     templateUrl: 'app/i18n/containers.directive.html'
   };
  }
]);

