'use strict';

angular.module('arethusaTranslateGuiApp').directive('container', [
  '$timeout',
  'containerHelper',
  function($timeout, containerHelper) {
    return {
      restrict: 'A',
      link: function(scope) {
        scope.s = scope.getStats(scope.container);

        function checkStatus() {
          containerHelper.checkStatus(scope);
        }

        function updateStatsAndCheck(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.updateValStats(stats, el);
          checkStatus();
        }

        scope.title = 'Container';

        function update() {
          scope.container.$update(function() {
            console.log('Database updated!');
          });
        }

        containerHelper.nameWatch(scope);
        containerHelper.dirtyWatch(scope);

        function addToStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.addStats(stats, el);
          scope.addStats(scope.stats.total, el);
          checkStatus();
        }

        function removeFromStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.removeStats(stats, el);
          scope.removeStats(scope.stats.total, el);
          checkStatus();
        }

        function updateTrslStats(ev, el) {
          var stats = scope.getStats(scope.container);
          scope.updateTrslStats(stats, el);
          scope.updateTrslStats(scope.stats.total, el);
        }

        scope.$on('valueChange', updateStatsAndCheck);
        scope.$on('valueAdded', addToStats);
        scope.$on('valueRemoved', removeFromStats);
        scope.$on('trslChange', updateTrslStats);
        scope.$on('subcontainerChange', checkStatus);

        var timer;
        scope.deferredUpdate = function() {
          if (timer) $timeout.cancel(timer);
          timer = $timeout(update, 1500);
        };

        scope.immediateUpdate = function() {
          if (timer) $timeout.cancel(timer);
          update();
        };

        scope.addSubContainer = scope.subContainerFactory(scope);
        scope.addValue = scope.valueFactory(scope);

        scope.remove = function() {
          scope.removeHelper(scope.containers, scope.container, function() {
            scope.$parent.$emit('containerRemoved', scope.container);
            scope.container.$remove();
          });
        };
      },
      templateUrl: 'app/i18n/container.directive.html'
    };
  }
]);
