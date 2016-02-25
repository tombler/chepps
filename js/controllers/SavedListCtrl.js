chepps.controller('SavedListCtrl', function ($scope, Auth, $location, Logout, $firebaseArray, $firebaseObject) {
    // Redirect to login if authData is null
    $scope.auth = Auth;
    $scope.auth.$onAuth(function(authData) {
      $scope.authData = authData;
      console.log(authData);
      if (!authData) {
        $location.path('/login');
      }
    });

    // Add logout functionality to this $scope.
    $scope.logout = Logout;

    // Setting scope variables
    $scope.item = {};
    $scope.showImportConfirmation = false;
    $scope.showDeleteConfirmation = false;
    
    // get current user's lists in Firebase
    var authData = $scope.auth.$getAuth(); 

    var newListUrl = "https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid + "/lists/";
    var ref = new Firebase(newListUrl);
    $scope.userLists = $firebaseArray(ref);
    // Workaround: add index as unique value for data targeting in the UI
    $scope.userLists.$loaded()
      .then(function (lists) {
        for (var i = 0; i < lists.length; i++) {
            console.log(lists[i]);
            lists[i].unique = i;
        }
        $scope.currentUserLists = lists;
        console.log($scope.currentUserLists)
      })
      .catch(function (error) {
        alert("error! Couldn't retrieve your lists!");
      })

    $scope.addItem = function (item, list) {
      var newItem = {
          name: item,
          price: 0,
          complete: false
      };
      list.items.push(newItem);
      $scope.currentUserLists.$save(list)
        .then(function (ref) {
          console.log("Item saved!");
        })
        .catch(function (err) {
          alert("error! Your item was not saved");
        })

        $scope.item.name = "";
    }

    $scope.removeItem = function (item, list) {
      var index = list.items.indexOf(item);
      list.items.splice(index, 1);

      $scope.currentUserLists.$save(list)
        .then(function (ref) {
          console.log("Item deleted!");
        })
        .catch(function (err) {
          alert("error! Your item was not deleted");
        })
    };

    $scope.toggleDeleteConfirmation = function () {
      $scope.showDeleteConfirmation = !($scope.showDeleteConfirmation);
      return $scope.showDeleteConfirmation;
    }

    $scope.toggleImportConfirmation = function () {
      $scope.showImportConfirmation = !($scope.showImportConfirmation);
      return $scope.showImportConfirmation;
    }

    $scope.deleteList = function (list) {
      $scope.currentUserLists.$remove(list)
        .then(function (ref) {
          console.log("List deleted!");
        })
        .catch(function (err) {
          alert("error! Your list was not deleted");
        })
    }

    $scope.importList = function (list) {
      
    }
   
});