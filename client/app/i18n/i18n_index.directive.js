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

angular.module('arethusaTranslateGuiApp').directive('i18nIndexExpander', [
  function() {
   function setExpander(scope) {
     scope.expander = scope.expanded ? '-' : '+';
   }

   function isEmpty(item) {
     return _.all([item.containers, item.values], function(el) {
       return !(el && el.length > 0);
     });
   }

   // This tracks if there are elements to expand only when the directive
   // is compiled - it's therefore not live. As this directive will most
   // likely be wrapped in an ngIf anyway, we might get away with this and
   // spare us the additional watchers needed for this.
   function init(scope) {
     if (isEmpty(scope.item)) {
       scope.expanded = true;
     }
     setExpander(scope);
   }

   return {
     restrict: 'A',
     link: function(scope) {
       scope.toggle = function() {
         scope.expanded = !scope.expanded;
         setExpander(scope);
       };

       init(scope);
     },
     template: '<span class="clickable" ng-click="toggle()">{{ expander }}</span>'
   };
  }
]);
