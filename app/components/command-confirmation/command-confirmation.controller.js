'use strict';

angular
    .module('CommandConfirmationModule', [])
    .controller('CommandConfirmationCtrl', function($scope, BasketFactory, ShippingFactory) {

        $scope.basketArticlesList = BasketFactory.getBasketContent();     // Panier de commande
        $scope.totalBasketCheckPriceExcludingTax = 0;                     // Prix total HT
        $scope.totalBasketCheckPriceExcludingTaxFloatFormat = null;       // Prix total HT au format 'Float'
        $scope.shippingPriceLabel = '';                                   // Libellé des frais de livraison
        $scope.shippingPrice = 0;                                         // Frais de livraison
        $scope.vatPrice = 0;                                              // Frais de TVA
        $scope.vatPriceFloatFormat = null;                                // Frais de TVA au format 'Float'
        $scope.totalBasketCheckPriceIncludingTax = 0;                     // Prix total TTC
        $scope.totalBasketCheckPriceIncludingTaxFloatFormat = null;       // Prix total TTC au format 'Float'
        $scope.isCommandConfirmed = false;
    
        $scope.$watch('basketArticlesList', function() {
          $scope.calculateBasketCheck($scope.basketArticlesList);
        });

        /**
         * Calcule le prix HT de chaque ligne et le prix total HT du panier
         */
        $scope.calculateBasketCheck = function(basketArticlesList) {
          var basketCheck = BasketFactory.calculateBasketCheck(basketArticlesList, true);
          
          angular.extend($scope.basketArticlesList, basketCheck.basketArticlesList);
    
          $scope.totalBasketCheckPriceExcludingTax = basketCheck.totalBasketCheckPriceExcludingTax;
          $scope.totalBasketCheckPriceExcludingTaxFloatFormat = basketCheck.totalBasketCheckPriceExcludingTaxFloatFormat;
          $scope.vatPrice = basketCheck.vatPrice;
          $scope.vatPriceFloatFormat = basketCheck.vatPriceFloatFormat;
          $scope.shippingPrice = basketCheck.shippingPrice;
          $scope.shippingPriceLabel = basketCheck.shippingPriceLabel;
          $scope.totalBasketCheckPriceIncludingTax = basketCheck.totalBasketCheckPriceIncludingTax;
          $scope.totalBasketCheckPriceIncludingTaxFloatFormat = basketCheck.totalBasketCheckPriceIncludingTaxFloatFormat;
        };

        $scope.confirmCommand = function() {

            var articlesList = [];

            $scope.basketArticlesList.forEach((item, i) => {
                articlesList[i] = {idArticle: item.idArticle, qte: item.quantity};
            });

            var obj = {
                adresse: ShippingFactory.getShippingAddressSelected().address,
                codePostal: ShippingFactory.getShippingAddressSelected().zip,
                ville: ShippingFactory.getShippingAddressSelected().city,
                prixTotalHT: $scope.totalBasketCheckPriceExcludingTax,
                prixTotalTTC: $scope.totalBasketCheckPriceIncludingTax,
                idClient: $scope.$parent.connectedCustomer.idCustomer,
                article: articlesList
            };

            console.log(obj);

            BasketFactory.confirmCommand(obj, confirmCommandCallback);

            //$scope.isCommandConfirmed = true;
        };

        function confirmCommandCallback(response) {
            console.log(response);
        }

    });