'use strict';

angular.module('arethusaTranslateGuiApp').directive('container', [
  function() {
    return {
      restrict: 'A',
      scope: {
        container: '='
      },
      link: function(scope, element, attrs) {
        scope.$watch('container.dirty', function(newVal, oldVal) {
          scope.statusClass = newVal ? 'dirty-bg' : 'clean-bg';
          console.log(scope.statusClass);
        });
      },
      templateUrl: 'app/i18n/container.directive.html'
    };
  }
]);
