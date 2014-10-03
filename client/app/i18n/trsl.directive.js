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

        if (!main) {
          scope.$watch('trsl.dirty', function(newVal) {
            var cl = newVal ? [DIRTY, CLEAN] : [CLEAN, DIRTY];
            table.addClass(cl[0]);
            table.removeClass(cl[1]);
          });

          scope.$on('mainDirty', function() {
            console.log('in broadcast');
            scope.trsl.dirty = true;
          });
        } else {
          scope.trsl.dirty = false;
        }

        var timer;
        scope.trackChange = function() {
          if (timer) $timeout.cancel(timer);
          timer = $timeout(function() {
            scope.trsl.dirty = false;
            scope.$emit(eventName);
          }, 1000);
        };
      },
      templateUrl: 'app/i18n/trsl.directive.html'
    };
  }
]);


