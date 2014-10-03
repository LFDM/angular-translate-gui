'use strict';

angular.module('arethusaTranslateGuiApp').directive('trsl', [
  '$timeout',
  function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var MAIN_LANGUAGE = 'en';
        var DIRTY = 'dirty-bg-dark';
        var CLEAN = 'clean-bg-dark';

        var main = MAIN_LANGUAGE === scope.trsl.lang;
        var table = element.find('table');
        var eventName = main ? 'mainChange' : 'trslChange';

        function switchClasses(newVal) {
          var classes = [DIRTY, CLEAN];
          var cl = newVal ? classes : classes.reverse();
          table.addClass(cl[0]);
          table.removeClass(cl[1]);

          scope.toggleIcon = newVal ? 'check' : 'remove';
        }

        function changeStatus(bool) {
          scope.trsl.dirty = bool;
          scope.$emit(eventName);
        }

        function setClean() {
          changeStatus(false);
        }

        function setDirty() {
          changeStatus(true);
        }

        scope.toggleStatus = function() {
          if (scope.trsl.dirty) {
            setClean();
          } else {
            setDirty();
          }
        };

        if (!main) {
          scope.$watch('trsl.dirty', switchClasses);
          scope.addMainDirtyListener(scope, 'trsl');
        } else {
          scope.trsl.dirty = false;
        }

        var timer;
        scope.trackChange = function() {
          if (timer) $timeout.cancel(timer);
          timer = $timeout(setClean, 1000);
        };
      },
      templateUrl: 'app/i18n/trsl.directive.html'
    };
  }
]);



