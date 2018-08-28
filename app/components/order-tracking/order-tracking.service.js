'use strict';

angular.module('OrderTrackingService', [])
    .factory('OrderTrackingFactory', function($http, config, OrderModel) {

        var orderTracking = {};

        orderTracking.getOrderById = function (idOrder, callback) {
            $http.get(config.dataPath + 'commande/' + idOrder)
                .then(function(response) {
                    //console.log(response.data[0])
                    callback(OrderModel.buildFR(response.data[0]));
                });
        };

        orderTracking.getRoundByCustomerAndId = function(idCustomer, idOrder, callback) {
            $http.get(config.dataPath + 'tournee/' + idCustomer + '/' + idOrder).then(function(response) {
                //console.log(response.data[0].idTournee)
                callback(response.data[0].idTournee);
            });
        };

        return orderTracking;

    })