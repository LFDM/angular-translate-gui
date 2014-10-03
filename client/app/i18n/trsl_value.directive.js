'use strict';

angular.module('arethusaTranslateGuiApp').directive('trslValue', [
  function() {
    return {
      restrict: 'A',
      link: function(scope) {
        scope.addMainDirtyListener(scope, 'value');

        scope.$on('trslChange', function() {
          if (scope.allClean(scope.value.translations)) {
            scope.value.dirty = false;
          } else {
            scope.value.dirty = true;
          }
        });
      },
      templateUrl: 'app/i18n/trsl_value.directive.html'
    };
  }
]);


