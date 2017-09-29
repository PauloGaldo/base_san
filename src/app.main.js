(function () {
    'use strict';

    var angular = require('angular');
    require('@uirouter/angularjs');
    require('./features/home/home.main.js');
    require('./features/home/home.config.js');
    require('./features/home/home.controller.js');    

    angular.module("sanitas", ['ui.router', 'sanitas.home']);

})();