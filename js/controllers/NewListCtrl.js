chepps.controller('NewListCtrl', function ($scope, Auth, $location, Logout, $firebaseArray, $firebaseObject) {
    

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

    // get current user's lists in Firebase
    var authData = $scope.auth.$getAuth(); 
    // var listsUrl = "https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid + "/lists/";
    // var ref = new Firebase(listsUrl);
    // $scope.userLists = $firebaseArray(ref);

    $scope.newList = {
        heading: "Create A New List!",
        added: false,
        text: "",
        date: ""
    }

    $scope.createList = function (title) {

        // Create a firebase ref for the new list
        $scope.encodedTitle = encodeURI(title);
        try {
            var newListUrl = "https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid + "/lists/" + $scope.encodedTitle;
            var ref = new Firebase(newListUrl);
            $scope.currentList = $firebaseObject(ref);
        } catch (e) {
           alert("error! can't use those characters in a title");
           // Refresh page and put flash message here
        }

        $scope.newList.added = true;
        var today = new Date();
        $scope.newList.date = (today.getMonth() + 1) + '/' + today.getDate() + '/' +  today.getFullYear();

        // Add properties to the new list
        $scope.currentList.title = title;
        $scope.currentList.dateCreated = $scope.newList.date;
        $scope.currentList.items = [];

        // Save the new list.
        $scope.currentList.$save().then(function() {
          console.log("New list saved!");
        }, function(error) {
          console.log("Error:", error);
        });
        
    };


    $scope.addItemToList = function (item) {

        var newItem = {
            name: item,
            price: 0,
            complete: false
        };

        // if no items in list, initialize array
        if (!$scope.currentList.items) {
            $scope.currentList.items = [];    
        }
        $scope.currentList.items.push(newItem);
        $scope.currentList.$save().then(function() {
          console.log("New item saved!");
          // Put flash message here
        }, function(error) {
          console.log("Error:", error);
          // Put flash message here
        });

        // After adding, reset input to empty
        $scope.item="";
    }

});