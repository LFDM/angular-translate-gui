'use strict';

angular.module('arethusaTranslateGuiApp').directive('container', [
  function() {
    return {
      restrict: 'A',
      scope: {
        container: '='
      },
      link: function(scope, element, attrs) {

      },
      templateUrl: 'app/i18n/container.directive.html'
    };
  }
]);
