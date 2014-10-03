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

    $scope.newContainer = function() {
      return new Container();
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
  }
]);
