'use strict';

angular
  .module('OrderTrackingModule', [])
  .controller('OrderTrackingCtrl', function($scope, $routeParams, attributionService, OrderTrackingFactory,$filter) {

    $scope.order = {};
    $scope.on_shipping_page = true;
    $scope.socket = io.connect('http://localhost:3000');
    $scope.socket.on('newGeoServeur', getCoordinates);
	$scope.coord;
	
    var markers = [];
    var CNAM = {lat: 43.566194, lng: 1.466705};
    var map = new google.maps.Map(
              document.getElementById('map'),
              {zoom: 14, center: CNAM}
    );

    OrderTrackingFactory.getOrderById($routeParams.idOrder, getOrderByIdCallback);

    $scope.idTurn;
    $scope.i = 43.566194, $scope.j = 1.466705, $scope.z = 1;
    
    function getCoordinates(data) {
	  $scope.coord = data;
      OrderTrackingFactory.getRoundByCustomerAndId($scope.$parent.connectedCustomer.idCustomer, $routeParams.idOrder, getRoundByCustomerAndIdCallback);      
    }

    function getOrderByIdCallback(order) {
      $scope.order = order;
    }

    function getRoundByCustomerAndIdCallback(data) {
      $scope.idTurn = data;
	  console.log("tournée commande :" + $scope.idTurn + " tournée send : " + $scope.coord.idTournee);
	  if ($scope.idTurn == $scope.coord.idTournee) {
        var mark = {lat: $scope.coord.latitude, lng: $scope.coord.longitude};        
        deleteMarkers();
        addMarker(mark);
        map.setCenter(new google.maps.LatLng($scope.coord.latitude,$scope.coord.longitude));
      }
    }

    // Adds a marker to the map and push to the array.
    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }

    // Removes the markers from the map, but keeps them in the array.
    function clearMarkers() {
        setMapOnAll(null);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }
  });