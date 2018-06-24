'use strict';

angular.module('DateTimeService', [])
    .constant('MONTHS', [{id: 1, labelFR: 'Janvier'}, {id: 2, labelFR: 'Février'}, {id: 3, labelFR: 'Mars'}, {id: 4, labelFR: 'Avril'}, {id: 5, labelFR: 'Mai'}, {id: 6, labelFR: 'Juin'}, {id:7, labelFR: 'Juillet'}, {id: 8, labelFR: 'Août'}, {id: 9, labelFR: 'Septembre'}, {id: 10, labelFR: 'Octobre'}, {id: 11, labelFR: 'Novembre'}, {id: 12, labelFR: 'Décembre'}])
    .factory('DateTimeFactory', function(MONTHS) {

        var dateTime = {};

        dateTime.getDate = function(dateTime, getAlphabeticForm = false) {
            var date;

            if (dateTime.includes('T')) {
                date = dateTime.split('T')[0];
            }

            if (getAlphabeticForm) {
                date = this.getAlphabeticForm(date);
            }

            return date;
        };

        dateTime.getAlphabeticForm = function(date) {

            var day = date.split('-')[2];
            var month = date.split('-')[1];
            var year = date.split('-')[0];

            month = MONTHS[parseInt(month) - 1].labelFR;

            return day + " " + month + " " + year;
        }

        dateTime.getTime = function(dateTime) {
            var time;

            if (dateTime.includes('Z')) {
                time = dateTime.split('T')[1].split('Z')[0];
                time = time.split(':')[0] + ':' + time.split(':')[1];
            }

            return time;
        };

        return dateTime;

    });