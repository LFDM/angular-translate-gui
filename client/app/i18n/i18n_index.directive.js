'use strict';

angular.module('arethusaTranslateGuiApp').directive('i18nIndex', [
  function() {
   return {
     restrict: 'A',
     scope: true,
     templateUrl: 'app/i18n/i18n_index.directive.html'
   };
  }
]);

angular.module('arethusaTranslateGuiApp').directive('i18nIndexCollection', [
  '$compile',
  function($compile) {
   return {
     restrict: 'A',
     scope: {
       containers: '=i18nIndexCollection'
     },
     link: function(scope, element) {
       var template = '\
         <li ng-repeat="container in containers">\
            <div i18n-index-item="container"/>\
         </li>\
       ';
       element.append($compile(template)(scope));
     }
   };
  }
]);

angular.module('arethusaTranslateGuiApp').directive('i18nIndexItem', [
  '$rootScope',
  function($rootScope) {
   return {
     restrict: 'A',
     scope: {
       item: '=i18nIndexItem'
     },
     link: function(scope) {
       scope.scrollThere = function() {
         $rootScope.$broadcast('autoScrollRequest', scope.item._id);
       };

       scope.$watch('item.dirty', function(newVal) {
         scope.statusClass = newVal ? 'dirty' : 'clean';
       });
     },
     templateUrl: 'app/i18n/i18n_index_item.directive.html'
   };
  }
]);
