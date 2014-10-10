'use strict';

angular.module('arethusaTranslateGuiApp').directive('example', [
  function() {
   return {
     restrict: 'A',
     scope: {
       example: '='
     },
     link: function(scope, element) {
       function bind() {
         element.on('dblclick', function() {
           scope.inputOpen = !scope.inputOpen;
           if (scope.inputOpen) {
             scope.autoFocus = true;
           }
         });
       }

       function unbind() {
         element.off('dblclick');
       }

       scope.$watch('$parent.adminMode', function(newVal) {
         scope.tooltipText = newVal ? 'Doubleclick to edit' : '';
         scope.adminMode = newVal;

         if (newVal) {
           bind();
         } else {
           unbind();
         }
       });
     },
     templateUrl: 'app/i18n/example.directive.html'
   };
  }
]);
