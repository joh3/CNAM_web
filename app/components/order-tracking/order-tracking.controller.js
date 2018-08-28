'use strict';

angular
  .module('OrderTrackingModule', [])
  .controller('OrderTrackingCtrl', function($scope, $routeParams, OrderTrackingFactory) {

    $scope.order = {};
    $scope.on_shipping_page = true;
    $scope.socket = io.connect('http://localhost:3000');
    $scope.socket.on("newGeoServeur", getCoordinates);

    OrderTrackingFactory.getOrderById($routeParams.idOrder, getOrderByIdCallback);

    $scope.idTurn;
    $scope.i = 14, $scope.j = 5, $scope.z = 1;

    setInterval(function(i, j) {
      //console.log($scope.$parent.connectedCustomer.idCustomer);
      $scope.z = ($scope.z + 1) % 3;
      $scope.socket.emit('newGeoMobile', {latitude: $scope.i, longitude: $scope.j, idTournee: $scope.z});
    }, 1000);

    function getCoordinates(data) {
      OrderTrackingFactory.getRoundByCustomerAndId($scope.$parent.connectedCustomer.idCustomer, $routeParams.idOrder, getRoundByCustomerAndIdCallback);
      if ($scope.idTurn === data.idTournee) {
        console.log("------------------");
        console.log("Good !");
        console.log(data);
      }
      
    }

    function getOrderByIdCallback(order) {
      $scope.order = order;
    }

    function getRoundByCustomerAndIdCallback(data) {
      $scope.idTurn = data;
    }

  });