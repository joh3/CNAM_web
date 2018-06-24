'use strict';

angular.module('CategoryService', [])
    .factory('CategoryModel', function($http, config) {

        /**
         * Crée une catégorie
         * @param {Integer} idCategory 
         * @param {String} label 
         */
        function Category(idCategory, label) {
            this.idCategory = idCategory;
            this.label = label;
        }

        /**
         * Récupère la catégorie d'un article donné
         * @param {Integer} idCategory 
         */
        Category.getCategoryByIdArticle = function(idCategory) {
            var url = config.dataPath + 'categorie/' + idCategory;

            $http.get(url).then(function(response) {
                return response;
            });
        };

        /**
         * Transforme un paramètre en catégorie
         * @param {Object} data 
         */
        Category.built = function(data) {
            return new Category(
                data.idCategory,
                data.label
            );
        };

        return Category;
    });