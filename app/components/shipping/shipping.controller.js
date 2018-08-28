'use strict';

angular
    .module('ShippingModule', [])
    .controller('ShippingCtrl', function($scope, $location, ShippingFactory, GoogleMapsOverrideFactory) {


        $scope.shippingModes = ShippingFactory.getShippingModes();
        $scope.shippingModeSelected = ShippingFactory.getShippingModeSelected();
        $scope.shippingPrice = 0;

        GoogleMapsOverrideFactory.initializeMaps();
        //console.log(GMO)

        $scope.on_shipping_page = true;
        var text = "";
        
        /*if (($scope.$parent.connectedCustomer.address === undefined) || (angular.isObject($scope.$parent.connectedCustomer.address) && $scope.$parent.connectedCustomer.address.address !== undefined && $scope.$parent.connectedCustomer.address.zip !== undefined && $scope.$parent.connectedCustomer.address.city !== undefined)) {
            text = $scope.$parent.connectedCustomer.address.address + " " + $scope.$parent.connectedCustomer.address.zip + " " + $scope.$parent.connectedCustomer.address.city;
        }*/
        var sgsa = ShippingFactory.getShippingAddressSelected();
        if ( (sgsa !== undefined) || (angular.isObject(sgsa) && sgsa.address !== undefined && sgsa.zip !== undefined && sgsa.city !== undefined)) {
            text = sgsa.address + " " + sgsa.zip + " " + sgsa.city;
        }
        $scope.customerProvidedAddress = text;

        function filterAddress(address) {
            var a, c, z, cutA;

            cutA = address.split(', ');

            if (cutA.length === 3) {
                a = cutA[0];
                z = cutA[1].split(" ")[0];
                c = cutA[1].split(z + " ")[1];
            }

            return {address: a, zip: z, city: c};
        }

        function determineDecision(data) {
            if (data.rows[0].elements[0].distance.value > 10000) {
                alert("Oups ! Nous ne pouvons pas vous livrer à cette adresse... Merci d'entrer une adresse placée à moins de 10km de votre Pizzeria préférée.");
            } else {
                var address = filterAddress(data.originAddresses[0]);
                ShippingFactory.setShippingAddressSelected(address);
                alert("Nous pouvons vous livrer :)");
            }
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