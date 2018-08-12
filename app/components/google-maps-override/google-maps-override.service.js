'use strict';

angular.module('GoogleMapsOverrideService', [])
    .factory('GoogleMapsOverrideFactory', function() {

        var gmo = {};

        gmo.geocoder;
        gmo.latlng;
        gmo.status;
        gmo.service;

        /**
         * Initialise la position du restaurant et la carte Google
         */
        gmo.initializeMaps = function() {
            this.geocoder = new google.maps.Geocoder();
            this.latlng = new google.maps.LatLng(43.5670097, 1.4642106);
            
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: this.latlng,
                zoom: 8
              });

            this.service = new google.maps.DistanceMatrixService();
        };

        gmo.getAddressProvided = function(address, callback) {
            this.geocoder.geocode({"address": address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    var p2 = {};
                    var latlng2;
                    var strpos;

                    strpos = results[0].geometry.location + "";
                    strpos = strpos.replace('(', '');
                    strpos = strpos.replace(')', '');

                    p2.lat = parseFloat(strpos.split(", ")[0]);
                    p2.lng = parseFloat(strpos.split(", ")[1]);

                    latlng2 = new google.maps.LatLng(p2.lat, p2.lng);

                    gmo.service.getDistanceMatrix({
                        origins: [gmo.latlng],
                        destinations: [latlng2],
                        travelMode: 'DRIVING'
                    }, callback);
                } else {
                    alert("Oups ! Impossible de trouver l'adresse...");
                }
            });
        };

        return gmo;

    });