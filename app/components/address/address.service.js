'use strict';

angular.module('AddressService', [])
    .factory('AddressModel', function() {

        function Address(idAddress, address, zip, city) {
            this.idAddress = idAddress;
            this.address = address;
            this.zip = zip;
            this.city = city;
        }

        Address.getAddressByIdCallback = function(address) {
            return this.buildFR(address);
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
    .factory('AddressFactory', function($http, config) {

        var address = {};

        address.getAddressById = function(idAddress, callback) {
            $http.get(config + 'adresse/' + idAddress)
                .then(function(response) {
                    callback(response.data);
                });
        };

        return address;

    });