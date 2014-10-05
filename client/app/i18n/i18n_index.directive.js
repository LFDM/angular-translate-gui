'use strict';

angular.module('arethusaTranslateGuiApp').directive('i18nIndex', [
  function() {
   return {
     restrict: 'A',
     scope: true,
     link: function(scope) {
     },
     templateUrl: 'app/i18n/i18n_index.directive.html'
   };
  }
]);


