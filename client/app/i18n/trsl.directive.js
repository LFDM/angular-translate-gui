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
        var eventName = main ? 'mainChange' : 'clean';

        function switchClasses(newVal) {
          var classes = [DIRTY, CLEAN];
          var cl = newVal ? classes : classes.reverse();
          table.addClass(cl[0]);
          table.removeClass(cl[1]);
        }

        function setClean() {
          scope.trsl.dirty = false;
          scope.$emit(eventName);
        }

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



