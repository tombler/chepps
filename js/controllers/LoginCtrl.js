chepps.controller('LoginCtrl', function ($scope, $firebaseAuth, $location, Auth) {
    
    // check to see auth status - if logged out, should be null, otherwise should auto redirect to home
    $scope.auth = Auth;
    $scope.auth.$onAuth(function(authData) {
      if (authData) {
        $location.path('/home'); // redirect here
      } else {
        console.log("Logged out");
      }
    });

    $scope.login = function (email, password) {

        var ref = new Firebase("https://t-and-es-grocery-app.firebaseio.com/");
        $scope.authObj = $firebaseAuth(ref);
        $scope.authObj.$authWithPassword({
          email: email,
          password: password
        }).then(function(authData) {
          console.log("Logged in as:", authData);
        }).catch(function(error) {
          console.error("Authentication failed:", error);
        });

    }; // End $scope.login
});