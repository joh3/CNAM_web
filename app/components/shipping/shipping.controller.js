'use strict';

angular
    .module('ShippingModule', [])
    .controller('ShippingCtrl', function($scope, $location, GoogleMapsOverrideFactory, ShippingFactory) {

        $scope.shippingModes = ShippingFactory.getShippingModes();
        $scope.shippingModeSelected = ShippingFactory.getShippingModeSelected();
        $scope.shippingPrice = 0;

        GoogleMapsOverrideFactory.initializeMaps();
        //console.log(GMO)

        $scope.on_shipping_page = true;
        $scope.customerProvidedAddress = $scope.$parent.connectedCustomer.address.address + " " + $scope.$parent.connectedCustomer.address.zip + " " + $scope.$parent.connectedCustomer.address.city;

        function determineDecision(data) {
            alert("Nous pouvons vous livrer :)");
        }

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

        $scope.nextStep = function() {
          if ($scope.shippingModeSelected !== null) {
            $location.path("/confirmation");
          }
        };

        $scope.checkSelected = function() {
            //console.log($scope.shippingModeSelected !== null);
            return ($scope.shippingModeSelected !== null) ? 'continue' : 'disabled';
        };

        /*$scope.$watch('shippingModeSelected', function(newV, old) {

            if (newV !== null) {
                $scope.checkSelected();
            }
        });*/

        // Vérifier éligibilité de l'adresse
        $scope.checkEligiblility = function() {
            GoogleMapsOverrideFactory.getAddressProvided($scope.customerProvidedAddress, determineDecision);
        };

    });