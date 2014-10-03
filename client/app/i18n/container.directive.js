'use strict';

angular.module('arethusaTranslateGuiApp').directive('container', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'A',
      link: function(scope) {
        scope.allClean = function(container) {
          var clean = true;
          for (var i = container.length - 1; i >= 0; i--){
            if (container[i].dirty) {
                clean = false;
                break;
            }
          }
          return clean;
        };

        scope.$watch('container.dirty', function(newVal) {
          scope.statusClass = newVal ? 'dirty-bg' : 'clean-bg';
        });

        scope.$on('mainChange', function() {
          scope.container.dirty = true;
          scope.$broadcast('mainDirty');
          scope.deferredUpdate();
        });

        scope.$on('trslChange', function() {
          var cont = scope.container;
          if (scope.allClean(cont.containers) && scope.allClean(cont.values)) {
            scope.container.dirty = false;
          } else {
            scope.container.dirty = true;
          }
          scope.deferredUpdate();
        });

        scope.addMainDirtyListener = function(childScope, property) {
          childScope.$on('mainDirty', function() {
            childScope[property].dirty = true;
          });
        };

        function update() {
          scope.container.$update(function() {
            console.log('Database updated!');
          });
        }

        var timer;
        scope.deferredUpdate = function() {
          if (timer) $timeout.cancel(timer);
          timer = $timeout(update, 1500);
        };
      },
      templateUrl: 'app/i18n/container.directive.html'
    };
  }
]);
