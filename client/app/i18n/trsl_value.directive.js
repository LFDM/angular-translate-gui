'use strict';

angular.module('arethusaTranslateGuiApp').directive('trslValue', [
  function() {
    return {
      restrict: 'A',
      scope: {
        value: '=trslValue'
      },
      link: function(scope, element, attrs) {

      },
      templateUrl: 'app/i18n/trsl_value.directive.html'
    };
  }
]);


