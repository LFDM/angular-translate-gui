'use strict';

angular.module('arethusaTranslateGuiApp').directive('subContainer', [
  'containerHelper',
  function(containerHelper) {
    var SC_CHANGE = 'subcontainerChange';

    return {
      restrict: 'A',
      link: function(scope) {
        function checkStatus() { containerHelper.checkStatus(scope); }

        scope.title = 'Sub-Container';

        containerHelper.nameWatch(scope);
        containerHelper.dirtyWatch(scope, function() {
          scope.$emit(SC_CHANGE);
        });

        function addToStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.addStats(stats, el);
        }

        function removeFromStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.removeStats(stats, el);
        }

        scope.$on('valueChange', checkStatus);
        scope.$on('valueAdded', addToStats);
        scope.$on('valueRemoved', removeFromStats);
        scope.$on('subcontainerChange', checkStatus);

        scope.addSubContainer = scope.subContainerFactory(scope);
        scope.addValue = scope.valueFactory(scope);

        scope.remove = function() {
          scope.removeHelper(scope.$parent.container.containers, scope.container, function() {
            // We can skip this scope, as it's removed anyway!
            scope.$parent.$emit(SC_CHANGE);
            scope.immediateUpdate();
          });
        };
      },
      templateUrl: 'app/i18n/container.directive.html'
    };
  }
]);

