'use strict';

angular.module('arethusaTranslateGuiApp').service('containerHelper', [
  function() {
    this.checkStatus = function(scope) {
      var cont = scope.container;
      if (scope.allClean(cont, 'containers') && scope.allClean(cont, 'values')) {
        scope.container.dirty = false;
      } else {
        scope.container.dirty = true;
      }
      scope.deferredUpdate();
    };
  }
]);
