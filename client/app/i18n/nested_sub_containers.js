'use strict';

angular.module('arethusaTranslateGuiApp').directive('nestedSubContainer', [
  '$compile',
  function($compile) {
   return {
     restrict: 'A',
     link: function(scope, element) {
       var template = '\
         <div\
           style="margin-left: 1rem"\
           class="fade"\
           ng-repeat="container in container.containers track by container.createdAt">\
             <div sub-container/>\
        </div>\
       ';
       element.append($compile(template)(scope));
     }
   };
  }
]);
