'use strict';

angular.module('arethusaTranslateGuiApp').directive('trsl', [
  '$timeout',
  function($timeout) {
    var MAIN_LANGUAGE = 'en';
    var DIRTY = 'dirty-bg-dark';
    var CLEAN = 'clean-bg-dark';

    function getEventName(main) {
      return main ? 'mainChange' : 'trslChange';
    }

    function isMain(lang) {
      return MAIN_LANGUAGE === lang;
    }

    return {
      restrict: 'A',
      link: function(scope) {
        var main = isMain(scope.trsl.lang);
        var eventName = getEventName(main);

        function switchClasses(newVal) {
          scope.statusClass = newVal ? DIRTY : CLEAN;
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

        function makeDirty() {
          scope.trsl.dirty = true;
        }

        function makeClean() {
          scope.trsl.dirty = false;
        }

        scope.toggleStatus = function() {
          if (scope.trsl.dirty) {
            setClean();
          } else {
            setDirty();
          }
        };

        var timer;
        scope.trackChange = function() {
          if (timer) $timeout.cancel(timer);
          timer = $timeout(setClean, 1000);
        };

        if (main) {
          makeClean();
        } else {
          scope.$watch('trsl.dirty', switchClasses);
          scope.$on('mainDirty', makeDirty);
        }
      },
      templateUrl: 'app/i18n/trsl.directive.html'
    };
  }
]);



