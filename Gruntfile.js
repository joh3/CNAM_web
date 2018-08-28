module.exports = function(grunt) {

    this.port = 9000;

    // Configuration du projet
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    "bower_components/angular/angular.min.js",
                    "bower_components/angular-cookies/angular-cookies.min.js",
                    "bower_components/angular-css/angular-css.min.js",
                    "bower_components/angular-route/angular-route.min.js",
                    "app/app.module.js",
                    "app/app.routes.js",
                    "app/components/article/article.service.js",
                    "app/components/basket/basket.service.js",
                    "app/components/customer/customer.service.js",
                    "app/components/category/category.service.js",
                    "app/components/shipping/shipping.service.js",
                    "app/shared/footer/footer.directive.js",
                    "app/shared/navbar/navbar.directive.js",
                    "app/components/article/article.controller.js",
                    "app/components/basket/basket.controller.js",
                    "app/components/command-confirmation/command-confirmation.controller.js",
                    "app/components/home/home.controller.js",
                    "app/components/order-history/order-history.controller.js",
                    "app/components/order-tracking/order-tracking.controller.js",
                    "app/components/shipping/shipping.controller.js",
                ],
                dest: 'js/build/production.js'
            }
        },
        uglify: {
            build: {
                src: 'js/build/production.js',
                dest: 'js/build/production.min.js'
            }
        },
        connect: {
            server: {
                options: {
                    port: this.port,
                    base: '.',
                    keepalive: true, 
                    useAvailablePort: true,
                    /*open: {
                        target: 'http://localhost:' + this.port,
                    }*/
                }
            }
        }/*,
        watch: {
            scripts: {
                files: [
                    "bower_components/angular/angular.min.js",
                    "bower_components/angular-cookies/angular-cookies.min.js",
                    "bower_components/angular-css/angular-css.min.js",
                    "bower_components/angular-route/angular-route.min.js",
                    "app/app.module.js",
                    "app/app.routes.js",
                    "app/components/article/article.service.js",
                    "app/components/basket/basket.service.js",
                    "app/components/customer/customer.service.js",
                    "app/components/category/category.service.js",
                    "app/components/order-history/order-history.service.js",
                    "app/components/shipping/shipping.service.js",
                    "app/shared/footer/footer.directive.js",
                    "app/shared/navbar/navbar.directive.js",
                    "app/components/article/article.controller.js",
                    "app/components/basket/basket.controller.js",
                    "app/components/command-confirmation/command-confirmation.controller.js",
                    "app/components/home/home.controller.js",
                    "app/components/order-history/order-history.controller.js",
                    "app/components/shipping/shipping.controller.js"
                ],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }*/
    });

    // Chargement des plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Tâches à lancer par défaut
    grunt.registerTask('default', ['concat', 'uglify', 'connect']);

};