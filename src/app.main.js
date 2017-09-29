require('@uirouter/angularjs');

const angular = require('angular');

angular.module('sanitas', ['ui.router', 'sanitas.home']);

/**
 * Require each app dep
 */
require('./app.config.js');

/**
 * Require each main feature
 */
require('./features/home/home.main.js');
