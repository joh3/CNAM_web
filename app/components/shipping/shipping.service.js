'use strict';

angular.module('ShippingService', ['ngCookies'])
    .factory('ShippingFactory', function($cookies) {
        var shippingMode = [
            {idModeLivraison: 1, libelle: "Aucun", description: "Je viens chercher ma commande", frais: "Gratuit", faIcon: "fa fa-street-view", selected: false},
            {idModeLivraison: 2, libelle: "Livraison", description: "Je me fais livrer à l'adresse suivante", frais: "3.50 €", faIcon: "fa fa-motorcycle", selected: false}
        ];
        var shippingModeSelected = null;
        var shippingService = {};

        shippingService.getShippingModes = function() {
            return shippingMode;
        };

        shippingService.selectShippingMode = function(shippingMode) {
            shippingModeSelected = shippingMode;
            $cookies.putObject('ecShippingModeSelected', shippingMode);
        };

        shippingService.getShippingModeSelected = function() {
            if ($cookies.getObject('ecShippingModeSelected') !== undefined) {
                shippingModeSelected = $cookies.getObject('ecShippingModeSelected');
            }
            return shippingModeSelected;
        };

        return shippingService;

    });