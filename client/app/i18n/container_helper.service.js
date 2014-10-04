'use strict';

angular.module('arethusaTranslateGuiApp').service('containerHelper', [
  function() {
    var self = this;

    this.checkStatus = function(scope) {
      var cont = scope.container;
      if (cont.name && scope.allClean(cont, 'containers') && scope.allClean(cont, 'values')) {
        scope.container.dirty = false;
      } else {
        scope.container.dirty = true;
      }
      scope.deferredUpdate();
    };

    this.nameWatch = function(scope) {
      scope.$watch('container.name', function(newVal, oldVal) {
        console.log(newVal);
        if (!oldVal) self.checkStatus(scope);
        if (!newVal) scope.container.dirty = true;
      });
    };
  }
]);
