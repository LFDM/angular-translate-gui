'use strict';

angular.module('arethusaTranslateGuiApp').directive('subContainer', [
  'containerHelper',
  function(containerHelper) {
    var DIRTY = 'dirty-bg';
    var CLEAN = 'clean-bg';
    var SC_CHANGE = 'subcontainerChange';

    return {
      restrict: 'A',
      link: function(scope) {
        function checkStatus() { containerHelper.checkStatus(scope); }

        scope.$watch('container.dirty', function(newVal) {
          scope.statusClass = newVal ? DIRTY : CLEAN;
          scope.$emit(SC_CHANGE);
        });

        scope.$on('valueChange', checkStatus);

        scope.addSubContainer = scope.subContainerFactory(scope);
        scope.addValue = scope.valueFactory(scope);

        scope.remove = function() {
          scope.removeHelper(scope.$parent.container.containers, scope.container, function() {
            // We can skip this scope, as it's removed anyway!
            scope.$parent.$emit(SC_CHANGE);
            scope.deferredUpdate();
          });
        };
      },
      templateUrl: 'app/i18n/sub_container.directive.html'
    };
  }
]);

