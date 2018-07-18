'use strict';

/**
 * @ngdoc overview
 * @name ecApp
 * @description
 * # ecApp
 *
 * Main module of the application.
 */
 

angular
  .module('ecApp', [
    'ngCookies',
    'ngRoute',
    'ngAnimate',
    'angularCSS',
    'AddressService',
    'ArticleService',
    'BasketService',
    'CategoryService',
    'CustomerService',
    'DateTimeService',
    'OrderService',
    'OrderHistoryService',
    'ShippingService',
    'HomeModule',
    'ArticleModule',
    'BasketModule',
    'CommandConfirmationModule',
    'OrderHistoryModule',
    'ShippingModule',
    'ecNavbar',
    'ecFooter',
	'ValidationModule',
	'validationService'
  ])
  .constant('config', {
      dataPath: 'http://localhost:3000/'
  })
  .controller('AppCtrl', function($scope, BasketFactory, CustomerFactory) {

    $scope.mainBasketArticlesQuantity;
    //console.log($scope.mainBasketArticlesQuantity);

    /*if ($scope.mainBasketArticlesQuantity === undefined) {
      $scope.mainBasketArticlesQuantity = BasketFactory.getBasketArticlesQuantity();
    }*/

    // Client
    $scope.customer = {id: 1, firstname: "Jean-Rachid", lastname: "Selema"};
    //CustomerFactory.getCustomerById(1);
    
  });
