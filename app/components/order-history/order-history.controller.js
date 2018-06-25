'use strict';

angular
  .module('OrderHistoryModule', [])
  .controller('OrderHistoryCtrl', function($scope, BasketFactory, OrderHistoryFactory, OrderModel) {

    $scope.orderHistoryList = [];
    $scope.orderOrganizationStatus = [{id: 1, label: "Toutes", active: true}, {id: 2, label: "Passées", possiblesValues: ["Livrée", "Non livrée", "Annulée"], active: false}, {id: 3, label: "En cours", possiblesValues: ["En cours"], active: false}];
    $scope.domain;

    OrderHistoryFactory.getOrderHistoryByCustomer($scope.$parent.customer.id, getOrderHistoryByCustomerCallback);

    function getOrderHistoryByCustomerCallback(orderHistory) {
      var currentOrder;
      angular.forEach(orderHistory, function(item) {
        currentOrder = OrderModel.buildFR(item);
        $scope.orderHistoryList.push(currentOrder);

        angular.forEach($scope.orderHistoryList, function(item) {
          item.active = false;
          item.totalPriceExcludingTaxFloat = BasketFactory.getFloatPrice(item.totalPriceExcludingTax);
          item.totalPriceIncludingTaxFloat = BasketFactory.getFloatPrice(item.totalPriceIncludingTax);
        });

      });
    }

    $scope.switchOrganizationStatus = function(idOrganizationStatus) {
      angular.forEach($scope.orderOrganizationStatus, function(item) {
        if (item.id === idOrganizationStatus) {
          item.active = true;
          $scope.domain = item;
        } else {
          item.active = false;
        }
        
      });
      //$scope.domain = ($scope.domain === HISTORY_PASSED) ? HISTORY_IN_PROGRESS : HISTORY_PASSED;
    };
    $scope.switchOrganizationStatus(1);

    $scope.dropdownOrder = function(idOrder) {
      $scope.orderHistoryList.forEach(function(item) {
        if (item.idOrder !== idOrder) {
          item.active = false;
        } else {
          item.active = (item.active === false) ? true : false;
        }
      });
    };

  });