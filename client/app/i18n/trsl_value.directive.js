'use strict';

angular.module('arethusaTranslateGuiApp').directive('trslValue', [
  function() {
    return {
      restrict: 'A',
      link: function(scope) {
        scope.$on('mainDirty', function() {
          scope.value.dirty = true;
        });

        scope.$on('clean', function() {
          if (scope.allClean(scope.value.translations)) {
           scope.value.dirty = false;
          }
        });
      },
      templateUrl: 'app/i18n/trsl_value.directive.html'
    };
  }
]);


