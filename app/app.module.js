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
    'GoogleMapsOverrideService',
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
    'ecFooter'
  ])
  .constant('config', {
    API_KEY: 'AIzaSyAaojRfzhFQENpxLM9W8zpKOLf4D0SaLGY',
    dataPath: 'http://localhost:3000/'
  })
  .controller('AppCtrl', function($q, $scope, AddressModel, CustomerFactory, CustomerModel) {

    // API Key
    //console.log(config.API_KEY);
    $scope.api_key = 'AIzaSyAaojRfzhFQENpxLM9W8zpKOLf4D0SaLGY';
    var idCus = 1;

    // Nombre d'articles
    $scope.mainBasketArticlesQuantity;
    $scope.connectedCustomer = {};
    $scope.connectedCustomerAddress;

    // Client
    CustomerFactory.getCustomerById(idCus, getCustomerByIdCallback);

    function getCustomerByIdCallback (customer) {
      //console.log(customer)
      
      $scope.connectedCustomer = customer;
      $scope.connectedCustomer.miniature = './assets/images/various/default-user-miniature.png';
      $scope.connectedCustomer = $scope.connectedCustomer;
    }

    function isImage(src) {

      var deferred = $q.defer();
  
      var image = new Image();
      image.onerror = function() {
          deferred.resolve(false);
      };
      image.onload = function() {
          deferred.resolve(true);
      };
      image.src = src;
  
      return deferred.promise;
    }
    
  })
  .filter('capitalizeWord', function() {
    return function(text) {
      return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
    }
});