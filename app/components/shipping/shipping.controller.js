'use strict';

angular
    .module('ShippingModule', [])
    .controller('ShippingCtrl', function($scope, ShippingFactory) {

        $scope.shippingModes = ShippingFactory.getShippingModes();
        $scope.shippingModeSelected = ShippingFactory.getShippingModeSelected();
        $scope.shippingPrice = 0;

        if ($scope.shippingModeSelected !== null) {
            $scope.shippingPrice = $scope.shippingModeSelected.frais;
        }

        $scope.selectShippingMode = function(shippingMode) {
            shippingMode.selected = true;
            ShippingFactory.selectShippingMode(shippingMode);
            $scope.shippingModeSelected = ShippingFactory.getShippingModeSelected();
            $scope.majInfos();
        };

        $scope.majInfos = function() {
            if ($scope.shippingModeSelected !== null) {
                $scope.shippingPrice = $scope.shippingModeSelected.frais;
            }
        };

    });