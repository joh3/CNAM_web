'use strict';

angular
  .module('ArticleModule', [])
  .controller('ArticleListCtrl', function($scope, $rootScope, ArticleFactory, BasketFactory) {

    $scope.init = function() {
      $rootScope.mainBasketArticlesQuantity = BasketFactory.getBasketArticlesQuantity();
    };

    $scope.init();

    ArticleFactory.getArticles(getArticlesCallback);
    $scope.articlesExistingTypes = ArticleFactory.getArticlesExistingTypes();

    function getArticlesCallback(articles) {
      $scope.articlesList = articles;
    }

    $scope.addArticleInBasket = function(article) {
      BasketFactory.addArticleQuantity(article);
      $rootScope.mainBasketArticlesQuantity = BasketFactory.getBasketArticlesQuantity();
      //console.log($rootScope.mainBasketArticlesQuantity);
    };

  });
  
  
  
  
  
  


















  
  
  

    /**
     * Incrémente la quantité d'une ligne du panier
     * @param {*} basketLine 
     *
    $scope.upQuantity = function(basketLine) {
      if ($scope.basket.length === 0) {
        $scope.basket = [];
      }
      basketLine.quantite += 1;
    }

    /**
     * Décrémente la quantité d'une ligne du panier
     * @param {*} basketLine 
     *
    $scope.downQuantity = function(basketLine) {
      basketLine.quantite -= 1;
    }*/
  
  
  
  
  
  
  
  
  
  /*.controller('ArticleDetailsCtrl', function($scope, $http, $routeParams, ArticleFactory) {
    console.log($routeParams.articleid);
    var url = 'http://localhost:3000/article/' + $routeParams.articleid;
    $http.get(url).then(function(response) {
        $scope.article = response.data;
      });
  })*/