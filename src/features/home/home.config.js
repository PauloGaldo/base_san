angular
    .module('sanitas.home')
    .config(Config);

Config.$inject = ['$stateProvider'];

function Config($stateProvider) {
  $stateProvider
      .state('home', {
        url: '/',
        template: require('features/home/home.html'),
        controller: 'HomeController',
        controllerAs: 'vm',
      });
}
