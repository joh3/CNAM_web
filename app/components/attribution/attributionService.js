/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

angular.module('AttributionService', [])
.service('attributionService', function ($http, config) {

    this.getToAssignCommands = function () {

        var res = $http.get(config.dataPath + 'attrCommands');
        return res;
    };

    this.testGoogle = function (adresse, codePostal, ville) {
        var res = $http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + adresse + '+' + codePostal + '+' + ville + '&key=AIzaSyCMqZuXIThK9PTeRIRNwfLdgBv4VC2-ctk');
        return res;
    }

    this.getAvailableLivreurs = function () {

        var res = $http.get(config.dataPath + 'livreursDispo');
        return res;
    };

    this.commitAnAttribution = function (idLivreur,commands) {

        var res = $http.post(config.dataPath + 'newTournee', {idLivreur: idLivreur, commands: commands});
        return res;
    };
});