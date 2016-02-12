var chepps = angular.module("Chepps", ['ngRoute', 'firebase']);

chepps.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

chepps.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: '/views/home.html',
        controller: 'HomeCtrl'
      })
  }
]);
