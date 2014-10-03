'use strict';

angular.module('arethusaTranslateGuiApp').controller('I18nCtrl', [
  '$scope',
  '$resource',
  function($scope, $resource) {
    var Container   = $resource('api/containers/:id', { id: '@_id' }, {
      update: { method: 'PUT'}
    });

    //var container1 = new Container({ name: 'landing', containers: [], values: [] });

    //var val = {
      //name: 'description',
      //comment: 'One-liner to describe the framework',
      //translations: []
    //};

    //var trsl1 = {
      //lang: 'en',
      //translation: 'A backend-independent client-side annotation framework'
    //};

    //var trsl2 = {
      //lang: 'de',
      //translation: 'Ein Backend-unabhängiges client-side Annotations-Framework'
    //};

    //val.translations.push(trsl1);
    //val.translations.push(trsl2);
    //container1.values.push(val);

    //container1.$save();

    Container.query(function(res) {
      $scope.containers = res;
    });

    $scope.newContainer = function() {
      return new Container();
    };

    $scope.languages = ['en', 'de', 'fr'];

    $scope.adminMode = true;
    $scope.$watch('adminMode', function(newVal, oldVal) {
      $scope.modeText = newVal ? 'Admin Mode' : 'Translator Mode';
    });

    $scope.toggleMode = function() {
      $scope.adminMode = !$scope.adminMode;
    };
  }
]);
