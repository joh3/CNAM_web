'use strict';

angular.module('CustomerService', ['AddressService'])
    .factory('CustomerModel', function(AddressModel) {

        function Customer(idCustomer, lastname, firstname, email, phoneNumber, idAddress, address, zip, city) {
            this.idCustomer = idCustomer;
            this.lastname = lastname;
            this.firstname = firstname;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.address = AddressModel.build({idAddress, address, zip, city});
        }

        Customer.buildFR = function(data)
        {
            return new Customer(
                data.idClient,
                data.nom,
                data.prenom,
                data.email,
                data.numTel,
                data.idAdresse,
                data.Adresse,
                data.codePostal,
                data.ville
            );
        };

        return Customer;

    })
    .factory('CustomerFactory', function($http, config, CustomerModel) {

        var customerService = {};

        customerService.getCustomerById = function(idCustomer, callback) {
            $http.get(config.dataPath + 'client/' + idCustomer)
                .then(function(response) {
                    callback(CustomerModel.buildFR(response.data[0]));
                });
        };

        return customerService;

    });