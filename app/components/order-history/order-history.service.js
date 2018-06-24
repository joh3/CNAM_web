'use strict';

angular.module('OrderHistoryService', [])
    .factory('OrderHistoryFactory', function($http, config) {

        var orderHistory = {};

        orderHistory.getOrderHistoryByCustomer = function(idCustomer, callback) {
            $http.get(config.dataPath + 'commande/client/' + idCustomer).then(function(response) {
                callback(response.data);
            });
        };

        orderHistory.getOrderLinesByOrder = function(idOrder) {
            return $http.get(config.dataPath + 'article/commande/' + idOrder);/*.then(function(response) {
                callback(response.data);
            });*/
        };

        return orderHistory;

    });