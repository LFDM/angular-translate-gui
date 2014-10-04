'use strict';

angular.module('arethusaTranslateGuiApp').controller('I18nCtrl', [
  '$scope',
  '$resource',
  '$modal',
  function($scope, $resource, $modal) {
    var Container = $resource('api/containers/:id', { id: '@_id' }, {
      update: { method: 'PUT'}
    });

    var Uid = $resource('/api/uid');

    Container.query(function(res) {
      $scope.containers = res;
    });

    $scope.newContainer = function(params) {
      params = angular.extend({
        dirty: true,
        createdAt: new Date().toJSON()
      }, params);
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
        $scope.containers.unshift(cont);
      });
    };

    $scope.subContainerFactory = function(childScope) {
      return function() {
        Uid.get(function(res) {
          var subContainer = $scope.newContainer({
            _id: res.uid,
            values: [],
            containers: []
          });
          childScope.container.containers.unshift(subContainer);
          childScope.immediateUpdate();
          childScope.$emit('trslChange');
          $scope.autoFocus = true;
        });

      };
    };

    $scope.$on('autoFocusTriggered', function() {
      $scope.autoFocus = false;
    });

    function Value(trsls, id) {
      this._id = id;
      this.dirty = true;
      this.translations = trsls;
      this.createdAt = new Date().toJSON();
    }

    $scope.valueFactory = function(childScope) {
      return function() {
        Uid.get(function(res) {
          var cont = childScope.container;
          var trsls = _.map($scope.languages, function(lang) {
            return { lang: lang, dirty: true };
          });
          var value = new Value(trsls, res.uid);

          cont.values.unshift(value);

          cont.dirty = true;
          $scope.autoFocus = true;
          childScope.immediateUpdate();
        });
      };
    };

    function removalConfirmed() {
      return $modal.open({
        templateUrl: 'app/i18n/removal_dialog.html',
        windowClass: 'removal-modal'
      }).result;
    }

    $scope.removeHelper = function(containers, container, fn) {
      removalConfirmed().then(function(result) {
        if (result) {
          var i = containers.indexOf(container);
          containers.splice(i, 1);
          fn();
        }
      });
    };

    $scope.allClean = function(el, property) {
      if (el.name) {
        var container = el[property];
        var clean = true;
        for (var i = container.length - 1; i >= 0; i--){
          if (container[i].dirty) {
              clean = false;
              break;
          }
        }
        return clean;
      }
    };
  }
]);
