'use strict';

angular.module('arethusaTranslateGuiApp').directive('trsl', [
  function() {
    return {
      restrict: 'A',
      scope: {
        trsl: '='
      },
      link: function(scope, element, attrs) {

      },
      templateUrl: 'app/i18n/trsl.directive.html'
    };
  }
]);



