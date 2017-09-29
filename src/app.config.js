
angular
    .module('sanitas')
    .config(Config);

Config.$inject = ['$locationProvider', '$urlRouterProvider'];

function Config($locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
}
