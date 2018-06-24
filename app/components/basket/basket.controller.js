'use strict';

angular
  .module('BasketModule', [])
  .controller('BasketCtrl', function($scope, $rootScope, BasketFactory) {

    $scope.basketArticlesList = BasketFactory.getBasketContent();     // Panier de commande
    $scope.totalBasketCheckPriceExcludingTax = 0;                     // Prix total HT
    $scope.totalBasketCheckPriceExcludingTaxFloatFormat = '';       // Prix total HT au format 'Float'

    /**
     * Calcule le prix HT de chaque ligne et le prix total HT du panier
     */
    $scope.calculateBasketCheck = function() {
      var basketCheck = BasketFactory.calculateBasketCheck($scope.basketArticlesList);
      
      angular.extend($scope.basketArticlesList, basketCheck.basketArticlesList);

      $scope.totalBasketCheckPriceExcludingTax = basketCheck.totalBasketCheckPriceExcludingTax;
      $scope.totalBasketCheckPriceExcludingTaxFloatFormat = basketCheck.totalBasketCheckPriceExcludingTaxFloatFormat;
    };

    $scope.upQuantity = function(articleLigne) {
      BasketFactory.addArticleQuantity(articleLigne);
      $scope.basketArticlesList = BasketFactory.getBasketContent();
    };

    $scope.downQuantity = function(articleLigne) {
      BasketFactory.removeArticleQuantity(articleLigne);
      $scope.basketArticlesList = BasketFactory.getBasketContent();
    };

    $scope.removeArticle = function(articleLigne) {
      var articleIndex = $scope.basketArticlesList.findIndex(basketItem => basketItem.idArticle === articleLigne.idArticle);
      BasketFactory.removeArticle(articleIndex, true);
      $scope.basketArticlesList = BasketFactory.getBasketContent();
    };

    $scope.getBasketArticlesQuantity = function() {
      $rootScope.mainBasketArticlesQuantity = $scope.basketArticlesList.length;
    };

    $scope.$watchCollection('basketArticlesList', function() {
      $scope.calculateBasketCheck();
    }, true);

    $scope.$watch('basketArticlesList.length', function() {
      //console.log($rootScope);
      $scope.getBasketArticlesQuantity();
      //$scope.$apply();
    });

  });