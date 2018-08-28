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
    'ngAnimate'/*,
    'ngMap'*/,
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
    'OrderTrackingService',
    'ShippingService',
    'HomeModule',
    'ArticleModule',
    'BasketModule',
    'CommandConfirmationModule',
    'OrderHistoryModule',
    'OrderTrackingModule',
    'ShippingModule',
    'ecNavbar',
    'ecFooter',
	'ValidationModule',
	'validationService',
	'AttributionModule',
	'AttributionService'
  ])
  .constant('config', {
    dataPath: 'http://localhost:3000/'
  })
  .controller('AppCtrl', function($q, $scope, CustomerFactory) {

    //GoogleMapsOverrideFactory.initializeMaps();

    /*$scope.gmo = {};

    $scope.gmo.geocoder;
    $scope.gmo.latlng;
    $scope.gmo.status;
    $scope.gmo.service;
    $scope.gmo.map;

    $scope.gmo.initializeMaps = function() {
      $scope.gmo.geocoder = new google.maps.Geocoder();
      $scope.gmo.latitude = 43.5670097;
      $scope.gmo.longitude = 1.4642106;
      $scope.gmo.latlng = new google.maps.LatLng($scope.gmo.latitude, $scope.gmo.longitude);
      
      $scope.gmo.map = new google.maps.Map(document.getElementById('map'), {
          center: $scope.gmo.latlng,
          zoom: 8
        });

      $scope.gmo.service = new google.maps.DistanceMatrixService();
    };
    $scope.gmo.initializeMaps
    console.log($scope.gmo.initializeMaps)
    //$scope.gmo.initializeMaps();

    $scope.gmo.getAddressProvided = function(address, callback) {
      $scope.gmo.geocoder.geocode({"address": address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              var p2 = {};
              var latlng2;
              var strpos;

              strpos = results[0].geometry.location + "";
              strpos = strpos.replace('(', '');
              strpos = strpos.replace(')', '');

              p2.lat = parseFloat(strpos.split(", ")[0]);
              p2.lng = parseFloat(strpos.split(", ")[1]);

              latlng2 = new google.maps.LatLng(p2.lat, p2.lng);

              gmo.service.getDistanceMatrix({
                  origins: [gmo.latlng],
                  destinations: [latlng2],
                  travelMode: 'DRIVING'
              }, callback);
          } else {
              alert("Oups ! Impossible de trouver l'adresse...");
          }
      });
  };*/

    // API Key
    //console.log(config.API_KEY);
    //$scope.api_key = 'AIzaSyAaojRfzhFQENpxLM9W8zpKOLf4D0SaLGY';
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