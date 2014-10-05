'use strict';

angular.module('arethusaTranslateGuiApp').directive('containers', [
  function() {
   return {
     restrict: 'A',
     scope: true,
     link: function(scope) {
       scope.$watch('showIndex', function(newVal) {
         if (newVal) {
           scope.itemClass = 'small-12';
           scope.containerClass = 'small-9';
         } else {
           scope.containerClass = 'small-12';
           scope.itemClass = 'small-6';
         }
       });
     },
     templateUrl: 'app/i18n/containers.directive.html'
   };
  }
]);

