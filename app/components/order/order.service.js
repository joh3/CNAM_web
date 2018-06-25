'use strict';

angular.module('OrderService', [])
    .factory('OrderModel', function(AddressModel, DateTimeFactory, OrderHistoryFactory, OrderLineModel) {

        Order.articles = [];

        Order.getOrderLinesByOrder = function (idOrder, articles) {

            OrderHistoryFactory.getOrderLinesByOrder(idOrder, articles)
                .then(function(response){
                    angular.forEach(response.data, function(item) {
                        articles.push(OrderLineModel.buildFR(item));
                    });
                });

            //return list;
        }

        function Order(idOrder, idAddress, dateTime, description, totalPriceExcludingTax, totalPriceIncludingTax, status, address, zip, city) {
            this.idOrder = idOrder;
            this.address = AddressModel.build({idAddress, address, zip, city});
            this.date = DateTimeFactory.getDate(dateTime, true);
            this.time = DateTimeFactory.getTime(dateTime);
            this.description = description;
            this.totalPriceExcludingTax = totalPriceExcludingTax;
            this.totalPriceIncludingTax = totalPriceIncludingTax;
            this.status = status;
            this.articles = [];
            Order.getOrderLinesByOrder(idOrder, this.articles);
        }

        Order.build = function(data) {
            return new Order(
                data.idOrder,
                data.idAddress,
                data.dateTime,
                data.description,
                data.totalPriceExcludingTax,
                data.totalPriceIncludingTax,
                data.status,
                data.address,
                data.zip,
                data.city
            );
        };

        Order.buildFR = function(data) {
            return new Order(
                data.idCommande,
                data.idAdresse,
                data.date,
                data.description,
                data.prixTotalHT,
                data.prixTotalTTC,
                data.etatCommande,
                data.Adresse,
                data.codePostal,
                data.ville
            );
        };

        return Order;

    })
    .factory('OrderLineModel', function() {

        function OrderLine(idArticle, label, quantity) {
            this.idArticle = idArticle;
            this.label = label;
            this.quantity = quantity;
        }

        OrderLine.build = function(data) {
            return new OrderLine(
                data.idArticle,
                data.label,
                data.quantity
            );
        };

        OrderLine.buildFR = function(data) {
            return new OrderLine(
                data.idArticle,
                data.libelle,
                data.quantite
            );
        };

        return OrderLine;
    });