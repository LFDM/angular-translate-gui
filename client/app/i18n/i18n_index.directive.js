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
  function() {
   return {
     restrict: 'A',
     scope: {
       item: '=i18nIndexItem'
     },
     template: '\
       <div>{{ item.name }}</div>\
       <ul i18n-index-collection="item.values"/>\
       <ul i18n-index-collection="item.containers"/>\
     '
   };
  }
]);
