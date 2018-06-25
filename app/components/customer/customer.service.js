'use strict';

angular.module('CustomerService', [])
    .factory('CustomerModel', function() {

        function Customer(idCustomer, lastname, firstname, email, phoneNumber, idAddress) {
            this.idCustomer = idCustomer;
            this.lastname = lastname;
            this.firstname = firstname;
            this.email = email;
            this.phoneNumber = phoneNumber;
            this.idAddress = idAddress;
        }

        Customer.built = function(data)
        {
            return new Customer(
                data.idClient,
                data.nom,
                data.prenom,
                data.email,
                data.numTel,
                data.idAdresse
            );
        };

        return Customer;

    })
    .factory('CustomerFactory', function($http, config, CustomerModel) {

        var customerService = {};

        customerService.getCustomerById = function(idCustomer, callback) {
            $http.get(config.dataPath + 'client/' + idCustomer)
                .then(function(response) {
                    console.log(CustomerModel.built(response.data[0]));
                    callback(CustomerModel.built(response.data[0]));
                });
        };

        return customerService;

    });