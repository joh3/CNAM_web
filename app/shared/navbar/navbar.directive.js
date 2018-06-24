'use strict';

angular
    .module('ecNavbar', [])
    .directive('ecNavbar', function() {
        return {
            restrict: 'E',
            templateUrl: './app/shared/navbar/navbar.template.html',
            css: './assets/styles/navbar.style.css',
            scope: {
                basketArticlesQuantity: '='
            }
        };
    });