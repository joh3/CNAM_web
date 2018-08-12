'use strict';

angular.module('AddressService', [])
    .factory('AddressModel', function() {

        function Address(idAddress, address, zip, city) {
            this.idAddress = idAddress;
            this.address = address;
            this.zip = zip;
            this.city = city;
        }

        Address.build = function(data) {
            return new Address(
                data.idAddress,
                data.address,
                data.zip,
                data.city
            );
        };

        Address.buildFR = function(data) {
            return new Address(
                data.idAdresse,
                data.Adresse,
                data.codePostal,
                data.ville
            );
        };

        return Address;

    })
    /*.factory('AddressFactory', function($http, config, AddressModel) {

        var address = {};

        address.getAddressById = function(idAddress, callback) {
            $http.get(config.dataPath + 'adresse/' + idAddress)
                .then(function(response) {
                    callback(response.data[0]);
                });
        };

        return address;

    });*/