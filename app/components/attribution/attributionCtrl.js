
angular
.module('AttributionModule', [])
.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
})
.component('attribution', {
    controllerAs: 'attributionCtrl',
    templateUrl: "./app/components/attribution/attribution.html",
    controller: function ($scope, attributionService, $filter, $interval) {
//http://jsfiddle.net/2ZzZB/4276/
//AIzaSyCMqZuXIThK9PTeRIRNwfLdgBv4VC2-ctk

        $scope.currentPage = 0;
        $scope.pageSize = 5;
        $scope.data = [];
        $scope.listeLivreurs = [];
        $scope.livreurPicked = null;
        $scope.commandsToAssign = [];
        $scope.isCommited = false;

        var markers = [];
        var CNAM = {lat: 43.566194, lng: 1.466705};
        var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 14, center: CNAM});

        //init
        reloadData();

        $interval(function () {
            $scope.isCommited = false;
        }, 60000);


        function reloadData() {
            $scope.commandsToAssign.length = 0;
            $scope.data.length = 0;
            deleteMarkers();
            addMarker(CNAM, 'CNAM');
            var location;
            attributionService.getToAssignCommands().then(function (response) {
                console.log(response.data);
                response.data.forEach(function (value) {
                    $scope.data.push({"title": "Commande " + value.idCommande + " : " + $filter('date')(value.date, "dd-MM-yyyy HH:mm"), "id": value.idCommande});

                    attributionService.testGoogle(value.Adresse.replace(/ /g, '+'), value.codePostal, value.ville).then(function (responseGeo) {

                        location = responseGeo.data.results[0].geometry.location;

                        addMarker(location, value.idCommande.toString());

                    });

                });
                //console.log(response.data[i].Adresse.replace(/ /g, '+'))
            });
        }

        this.pushOrPullCommands = function (obj) {
            var index = null;
            var actualId;
            var target = angular.element(obj.currentTarget);
            actualId = target.attr('id');
            console.log(actualId);

            for (var i = 0; i < $scope.commandsToAssign.length; i++) {
                if ($scope.commandsToAssign[i] === actualId) {
                    index = i;
                }
            }

            if (index != null) {
                $scope.commandsToAssign.splice(index, 1);
            } else {
                $scope.commandsToAssign.push(actualId);
            }

            console.log($scope.commandsToAssign);
        }

        this.getLivreur = function () {
            $scope.livreurPicked=null;
            $scope.listeLivreurs.length = 0;
            attributionService.getAvailableLivreurs().then(function (response) {
                response.data.forEach(function (value) {
                    $scope.listeLivreurs.push({"personne": value.prenom + " " + value.nom, "id": value.idLivreur});

                });
            });

        }

        this.pickLivreur = function (obj) {
            var actualId;
            var target = angular.element(obj.currentTarget);
            actualId = target.attr('id');
            $scope.livreurPicked = actualId;
        }

        this.commitAttribution = function () {
            attributionService.commitAnAttribution($scope.livreurPicked, $scope.commandsToAssign).then(function (response) {
                if (response.status == 200) {
                    $scope.isCommited = true;
                    reloadData();
                }
            })

        }


        // Adds a marker to the map and push to the array.
        function addMarker(location, label) {
            var marker = new google.maps.Marker({
                position: location,
                map: map,
                label: label

            });
            markers.push(marker);
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setMapOnAll(null);
        }

        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
            clearMarkers();
            markers = [];
        }





    }});





