'use strict';

angular
    .module('ecFooter', [])
    .directive('ecFooter', function() {
        return {
            restrict: 'E',
            templateUrl: './app/shared/footer/footer.template.html',
            css: './assets/styles/footer.style.css'
        };
    });