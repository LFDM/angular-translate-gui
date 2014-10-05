'use strict';

angular.module('arethusaTranslateGuiApp').directive('subContainer', [
  'containerHelper',
  function(containerHelper) {
    var SC_CHANGE = 'subcontainerChange';

    return {
      restrict: 'A',
      link: function(scope) {
        scope.s = scope.getStats(scope.container);

        function checkStatus() { containerHelper.checkStatus(scope); }

        scope.title = 'Sub-Container';

        containerHelper.nameWatch(scope);
        containerHelper.dirtyWatch(scope, function() {
          scope.$emit(SC_CHANGE);
        });

        function updateStatsAndCheck(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.updateValStats(stats, el);
          checkStatus();
        }


        function addToStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.addStats(stats, el);
          checkStatus();
        }

        function removeFromStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.removeStats(stats, el);
          checkStatus();
        }

        function updateTrslStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.updateTrslStats(stats, el);
        }

        scope.$on('valueChange', updateStatsAndCheck);
        scope.$on('valueAdded', addToStats);
        scope.$on('valueRemoved', removeFromStats);
        scope.$on('trslChange', updateTrslStats);
        scope.$on('subcontainerChange', checkStatus);

        scope.addSubContainer = scope.subContainerFactory(scope);
        scope.addValue = scope.valueFactory(scope);

        scope.remove = function() {
          scope.removeHelper(scope.$parent.container.containers, scope.container, function() {
            // We can skip this scope, as it's removed anyway!
            scope.$parent.$emit('containerRemoved', scope.container);
            scope.$parent.$emit(SC_CHANGE);
            scope.immediateUpdate();
          });
        };
      },
      templateUrl: 'app/i18n/container.directive.html'
    };
  }
]);

