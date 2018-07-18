/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('validationService', [])
.service('validationService', function ($http, config) {


    this.getToValidateCommands = function () {

        var res = $http.get(config.dataPath + 'validCommands');
        return res;
    };

    this.getCommandDetails = function (id) {
        var res = $http.get(config.dataPath + 'article/commande/' + id);
        return res;
    };

    this.getClientDetails = function (id) {
        var res = $http.get(config.dataPath + 'client/AttrCommande/' + id);
        return res;
    };

    this.validerCommande = function (id) {
        var res = $http.post(config.dataPath + 'majCommands', {etatCommande: 'Attribuée', idCommande: id});
        return res;
    };

    this.supprimerCommande = function (id) {
        var res = $http.post(config.dataPath + 'deleteCommand', {idCommande: id});
        return res;
    };

});