'use strict';

angular.module('ArticleService', ['ngCookies', 'BasketService', 'CategoryService'])
    .factory('ArticleModel', function(CategoryModel, BasketFactory) {

        Article.category = {};

        function getCategoryByIdArticleCallback(response) {
            /*console.log(response.data[0])
            //this.category = CategoryModel.built(response.data[0]);
            this.category.idCategory = response.data[0].idCategorie;
            this.category.nomCategory = response.data[0].nomCategorie;*/

            return response.data[0];
        }
        
        function Article(idArticle, idCategory, label, description, unitPriceExcludingTax, vatRate, categoryLabel) {
            this.idArticle = idArticle;
            this.label = label;
            this.description = description;
            this.unitPriceExcludingTax = unitPriceExcludingTax;
            this.unitPriceExcludingTaxFloatFormat = BasketFactory.getFloatPrice(unitPriceExcludingTax);
            this.vatRate = vatRate;
            this.category = {};
            this.category.idCategory = idCategory;
            this.category.label = categoryLabel;
            //CategoryModel.getCategoryByIdArticle(idCategory, getCategoryByIdArticleCallback);
            //this.category = CategoryModel.getCategoryByIdArticle(idCategory);
        }

        Article.built = function(data) {
            return new Article(
                data.idArticle,
                data.idCategory,
                data.label,
                data.description,
                data.unitPriceExcludingTax,
                data.vatRate,
                data.categoryLabel
            );
        };

        return Article;
    })
    .factory('ArticleFactory', function($http, config, ArticleModel) {

        var articleService = {};
         
        articleService.getArticles = function(callback) {
            
            var articlesList = [];
            var url = config.dataPath + 'articles';

            $http.get(url).then(function(response) {
                callback(articleService.matchEnglishNamesForVars(response.data));
                //angular.extend(articlesList, articleService.matchEnglishNamesForVars(response.data));
            });
        };

        articleService.matchEnglishNamesForVars = function(articlesList) {

            var matchedArticlesList = [],
                matchedElement;

            articlesList.forEach(element => {
                matchedElement = {};

                matchedElement.idArticle = element.idArticle;
                matchedElement.idCategory = element.idCategorie;
                matchedElement.label = element.libelle;
                matchedElement.description = element.description;
                matchedElement.unitPriceExcludingTax = element.prixHT;
                matchedElement.vatRate = element.taux;
                matchedElement.categoryLabel = element.nomCategorie;

                matchedArticlesList.push(ArticleModel.built(matchedElement));
                
                //console.log(matchedArticlesList);
            });

            return matchedArticlesList;
        };

        articleService.getArticlesExistingTypes = function() {
            return [{idType: 1, labelType: 'Plat', plurialLabelType: 'Plats'}, {idType: 2, labelType: 'Boisson', plurialLabelType: 'Boissons'}];
        };

        return articleService;

    });