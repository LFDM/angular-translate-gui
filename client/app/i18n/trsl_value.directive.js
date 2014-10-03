'use strict';

angular.module('arethusaTranslateGuiApp').directive('trslValue', [
  function() {
    return {
      restrict: 'A',
      link: function(scope, element) {
        var DIRTY = 'dirty-bg';
        var CLEAN = 'clean-bg';

        scope.addMainDirtyListener(scope, 'value');
        element.css('padding', '1rem');

        function switchClasses(newVal) {
          var classes = [DIRTY, CLEAN];
          var cl = newVal ? classes : classes.reverse();
          element.addClass(cl[0]);
          element.removeClass(cl[1]);
        }

        scope.$watch('value.dirty', switchClasses);


        scope.$on('trslChange', function() {
          if (scope.allClean(scope.value.translations)) {
            scope.value.dirty = false;
          } else {
            scope.value.dirty = true;
          }
        });

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
      },
      templateUrl: 'app/i18n/trsl_value.directive.html'
    };
  }
]);


