var chepps = angular.module("Chepps", ['ngRoute', 'firebase']);

chepps.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/");
    return $firebaseAuth(ref);
  }
]);

chepps.factory("Logout", function ($rootScope, Auth, $firebaseAuth, $location) {
    $rootScope.auth = Auth;
    return function () {
        $rootScope.auth.$unauth();
        $location.path('/login');
    }
});

chepps.factory("Import", function () {
  var storage = {};

  return {
      getList: function (list) {
          if (storage.hasOwnProperty(list)) {
              return storage[list];
          }
      },
      setList: function (list, items) {
          storage[list] = items;
      },
      emptyList: function () {
        storage = {};
      }
  };
});

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
      .when('/newlist', {
        templateUrl: '/views/newlist.html',
        controller: 'NewListCtrl'
      })
      .when('/savedlists', {
        templateUrl: '/views/savedlist.html',
        controller: 'SavedListCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }
]);
