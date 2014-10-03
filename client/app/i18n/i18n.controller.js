'use strict';

angular.module('arethusaTranslateGuiApp').controller('I18nCtrl', [
  '$scope',
  '$resource',
  function($scope, $resource) {
    var Container   = $resource('api/containers/:id', { id: '@_id' }, {
      update: { method: 'PUT'}
    });

    Container.query(function(res) {
      $scope.containers = res;
    });

    $scope.newContainer = function(params) {
      params = angular.extend({ dirty: true }, params);
      return new Container(params);
    };

    $scope.languages = ['en', 'de', 'fr', 'it', 'hr'];

    $scope.adminMode = true;
    $scope.$watch('adminMode', function(newVal) {
      $scope.modeText = newVal ? 'Admin Mode' : 'Translator Mode';
    });

    $scope.toggleMode = function() {
      $scope.adminMode = !$scope.adminMode;
    };

    $scope.addContainer = function() {
      var cont = $scope.newContainer();
      cont.$save(function() {
        $scope.containers.push(cont);
      });
    };

    $scope.subContainerFactory = function(childScope) {
      return function() {
        var subContainer = $scope.newContainer({ values: [], containers: [] });
        childScope.container.containers.push(subContainer);
        childScope.deferredUpdate();
      };
    };

    $scope.valueFactory = function(childScope) {
      return function() {
        var cont = childScope.container;
        var trsls = _.map($scope.languages, function(lang) {
          return { lang: lang, dirty: true };
        });
        cont.values.push({ translations: trsls, dirty: true });
        cont.dirty = true;
        childScope.deferredUpdate();
      };
    };

    $scope.removeFactory = function(containers, container, fn) {
      return function() {
        // Ask for confirmation
        var i = containers.indexOf(container);
        containers.splice(i, 1);
        fn();
      };
    };
  }
]);
