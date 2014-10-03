
'use strict';

angular.module('arethusaTranslateGuiApp').directive('dumpDialog', [
  '$modal',
  function($modal) {
    return {
      restrict: 'A',
      link: function(scope, element) {
        element.bind('click', function() {
          $modal.open({
            templateUrl: 'app/dump/dump.html',
            controller: 'DumpCtrl',
            resolve: {
              languages: function() {
                return scope.languages;
              }
            }
          });
        });
      }
    };
  }
]);



