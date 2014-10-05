'use strict';

angular.module('arethusaTranslateGuiApp').service('containerHelper', [
  function() {
    var self = this;

    var DIRTY = 'dirty-bg';
    var CLEAN = 'clean-bg';

    function stats(scope) {
      return scope.getStats(scope.container);
    }

    function isDirty(scope) {
      return stats(scope).dirty || _.find(scope.container.containers, function(el) {
        return el.dirty;
      });
    }

    this.checkStatus = function(scope) {
      var cont = scope.container;
      if (cont.name && !isDirty(scope)) {
        scope.container.dirty = false;
      } else {
        scope.container.dirty = true;
      }
      scope.deferredUpdate();
    };

    this.nameWatch = function(scope) {
      scope.$watch('container.name', function(newVal, oldVal) {
        if (!oldVal) self.checkStatus(scope);
        if (!newVal) scope.container.dirty = true;
      });
    };

    this.dirtyWatch = function(scope, fn) {
      scope.$watch('container.dirty', function(newVal) {
        scope.statusClass = newVal ? DIRTY : CLEAN;
        if (fn) fn();
      });
    };
  }
]);
