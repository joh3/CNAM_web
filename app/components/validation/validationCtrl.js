/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


app.component('validation', {
    controllerAs: 'validationCtrl',
    templateUrl: "views/validation.html",
    controller: function (validationService, $scope, $timeout, $interval) {

        //recupère pour la première fois la liste des commandes à valider
        reloadData();

        //rafraichir la liste toute les 1 minutes
        $interval(function () {
            reloadData();
        }, 60000);



        //fonction qui récupère la liste des commandes à valider
        function reloadData() {
            validationService.getToValidateCommands().then(function (response) {
                $scope.validateCommands = response.data;
            });

        }

        //validation d'une commande
        this.validerCmd = function () {
            
            validationService.validerCommande(this.actualId).then(function (response) {
                if (response.status == 200) {
                    $scope.msgValidated = "Commande Validée !";
                    $scope.validated = true;
                    reloadData();
                } else {
                    $scope.error = true;
                }
            });


            $timeout(function () {
                $scope.validated = false;
                $scope.error = false;
            }, 5000);



        };

        //suppression d'une commande
        this.supprimerCmd = function () {

            validationService.supprimerCommande(this.actualId).then(function (response) {
                if (response.status == 200) {
                    $scope.msgValidated = "Commande supprimée! ";
                    $scope.validated = true;
                    reloadData();
                } else {
                    $scope.error = true;
                }
            });


            $timeout(function () {
                $scope.validated = false;
                $scope.error = false;
            }, 5000);



        };

        //details d'une commande
        this.detailCmd = function (idCommande) {
            this.actualId=idCommande;
            validationService.getCommandDetails(this.actualId).then(function (response) {
                if (response.data.length > 0) {
                    

                    $scope.CommandDetails = response.data;
                }

            });

            validationService.getClientDetails(this.actualId).then(function (response) {
                $scope.clientDetails = response.data;
            });

        };


    }
});