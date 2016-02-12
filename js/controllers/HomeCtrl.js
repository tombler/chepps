chepps.controller('HomeCtrl', function ($scope, Auth, $location) {

    // Redirect to login if authData is null
    $scope.auth = Auth;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      console.log(authData);
      if (!authData) {
        $location.path('/login');
      }
    });

    $scope.logout = function () {
        $scope.auth.$unauth();
        $location.path('/login');
    }

    $scope.title = "Dynamic Groceries";

    $scope.viewNewList = function () {
        $location.path('/newlist');
    };

    $scope.viewSavedLists = function () {
        $location.path('/savedlists');
    };

});