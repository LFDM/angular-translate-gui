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

        function changeAllStatus(bool) {
          var trsls = scope.value.translations;
          for (var i = trsls.length - 1; i >= 0; i--){
            var trsl = trsls[i];
            trsl.dirty = bool;
          }
          scope.$emit('trslChange');
        }

        scope.setDirty = function() {
          changeAllStatus(true);
        };

        scope.setClean = function() {
          changeAllStatus(false);
        };
      },
      templateUrl: 'app/i18n/trsl_value.directive.html'
    };
  }
]);


