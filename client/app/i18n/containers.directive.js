'use strict';

angular.module('arethusaTranslateGuiApp').directive('containers', [
  function() {
   return {
     restrict: 'A',
     scope: true,
     link: function(scope, element, attrs) {

     },
     templateUrl: 'app/i18n/containers.directive.html'
   };
  }
]);

