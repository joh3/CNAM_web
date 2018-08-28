'use strict';

angular
  .module('OrderHistoryModule', [])
  .controller('OrderHistoryCtrl', function($scope, BasketFactory, OrderHistoryFactory, OrderLineModel, OrderModel) {

    /*
    - Validée
    - Attribuée
    - En cours de livraison
    - Livrée
    - Annulée
    */
    $scope.orderOrganizationStatus = [
      {id: 0, label: "Toutes", active: true},
      {id: 1, label: "En cours", possiblesValues: ["En cours", "En cours de livraison"], active: false},
      {id: 2, label: "Terminées", possiblesValues: ["Livrée", "Non livrée", "Annulée"], active: false}
    ];

    $scope.domain = 0;
    
    if ($scope.$parent.connectedCustomer.idCustomer !== undefined) {
      OrderHistoryFactory.getOrderHistoryByCustomer($scope.$parent.connectedCustomer.idCustomer, getOrderHistoryByCustomerCallback);
    }

    $scope.orderHistoryList = [];

    function getOrderHistoryByCustomerCallback(orderHistory) {

      
      var currentOrder, currentIndex, currentIndex2, idDomain;
      
      $scope.orderHistoryList[0] = {};
      $scope.orderHistoryList[0].active = true;
      $scope.orderHistoryList[0].orders = [];
    
      $scope.orderHistoryList[1] = {};
      $scope.orderHistoryList[1].active = false;
      $scope.orderHistoryList[1].orders = [];
  
      $scope.orderHistoryList[2] = {};
      $scope.orderHistoryList[2].active = false;
      $scope.orderHistoryList[2].orders = [];

      angular.forEach(orderHistory, function(item) {

        currentIndex = $scope.orderHistoryList[0].orders.findIndex(x => x.idOrder === item.idCommande);
        if (currentIndex == -1) {
          currentOrder = OrderModel.buildFR(item);
          //console.log(currentOrder)
          currentOrder.active = false;
          currentOrder.totalPriceExcludingTaxFloat = BasketFactory.getFloatPrice(currentOrder.totalPriceExcludingTax);
          currentOrder.totalPriceIncludingTaxFloat = BasketFactory.getFloatPrice(currentOrder.totalPriceIncludingTax);
          currentOrder.articles = [];
          currentOrder.articles.push( OrderLineModel.build({idArticle: item.idArticle, label: item.libelle, quantity: item.quantite}) );

          $scope.orderHistoryList[0].orders.push(currentOrder);

          switch (currentOrder.status) {
            case "Validée":
              $scope.orderHistoryList[1].orders.push(currentOrder);
              break;

            case "Attribuée":
              $scope.orderHistoryList[1].orders.push(currentOrder);
              break;
              
            case "En cours de livraison":
              $scope.orderHistoryList[1].orders.push(currentOrder);
              break;
              
            case "Livrée":
              $scope.orderHistoryList[2].orders.push(currentOrder);
              break;
              
            case "Annulée":
              $scope.orderHistoryList[2].orders.push(currentOrder);
              break;
          }
        } else {
          $scope.orderHistoryList[0].orders[currentIndex].articles.push( OrderLineModel.build({idArticle: item.idArticle, label: item.libelle, quantity: item.quantite}) );
          idDomain = (item.status == "Livrée" || item.status == "Annulée") ? 2 : 1;
          currentIndex2 = $scope.orderHistoryList[idDomain].orders.findIndex(x => x.idOrder === item.idCommande); //console.log(currentIndex2)
          if (currentIndex2 !== -1) {
            if ( $scope.orderHistoryList[idDomain].orders[currentIndex2].articles.findIndex(y => y.label === item.libelle) === -1) {
              $scope.orderHistoryList[idDomain].orders[currentIndex2].articles.push( OrderLineModel.build({idArticle: item.idArticle, label: item.libelle, quantity: item.quantite}) );
            }
          }
        }

      });
      
      $scope.switchOrganizationStatus(0);
    }

    $scope.switchOrganizationStatus = function(idOrganizationStatus) {

      switch (idOrganizationStatus) {

        case 0:
          $scope.orderHistoryList[2].active = true;
          $scope.orderHistoryList[1].active = true;
          break;

        case 2:
          $scope.orderHistoryList[2].active = true;
          $scope.orderHistoryList[1].active = false;
          break;

        case 1:
          $scope.orderHistoryList[2].active = false;
          $scope.orderHistoryList[1].active = true;
          break;
      }

      angular.forEach($scope.orderOrganizationStatus, function(item) {
        if (item.id === idOrganizationStatus) {
          item.active = true;
          $scope.domain = item;
        } else {
          item.active = false;
        }
      });

      $scope.domain = idOrganizationStatus;
    };

    $scope.dropdownOrder = function(idOrder) {
      $scope.orderHistoryList[$scope.domain].orders.forEach(function(item) {
        if (item.idOrder !== idOrder) {
          item.active = false;
        } else {
          item.active = (item.active === false) ? true : false;
        }
      });
    };

  });