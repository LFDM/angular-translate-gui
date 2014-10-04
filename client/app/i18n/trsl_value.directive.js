'use strict';

angular.module('arethusaTranslateGuiApp').directive('trslValue', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var DIRTY = 'dirty-bg';
        var CLEAN = 'clean-bg';

        function switchClassAndNotify(newVal) {
          scope.statusClass = newVal ? DIRTY : CLEAN;
        }

        function isClean() {
          return scope.allClean(scope.value, 'translations');
        }

        function checkDirtyness() {
          console.log('checking');
          scope.value.dirty = !isClean();
        }

        function emit() {
          scope.$emit('trslChange');
        }

        scope.$watch('value.dirty', switchClassAndNotify);

        scope.$watch('value.name', function(newVal, oldVal) {
          if (!oldVal) checkDirtyness();
          if (!newVal) scope.value.dirty = true;
        });

        scope.$on('mainChange', function() {
          scope.value.dirty = true;
          scope.$broadcast('mainDirty');
          scope.deferredUpdate();
        });

        scope.$on('trslChange', checkDirtyness);

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

        scope.removeConfirmation = function() {
          // Should ask if user is sure he wants to do that
          var values = scope.container.values;
          var i = values.indexOf(scope.value);
          values.splice(i, 1);
          emit();
          scope.deferredUpdate();
        };
      },
      templateUrl: 'app/i18n/trsl_value.directive.html'
    };
  }
]);


