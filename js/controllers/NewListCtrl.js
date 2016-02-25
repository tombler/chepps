chepps.controller('NewListCtrl', function ($scope, Auth, $location, Logout, $firebaseArray, $firebaseObject, Import) {
    

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

    // Initial data for view before adding a new list
    $scope.newList = {
        heading: "Create A New List!",
        added: false,
        text: "",
        date: "",
        showTitleForm: false
    }

    // Check if user is importing a list from our factory
    if (Import.getList("list_object") !== undefined) {
        //initialize new list for the DOM
        $scope.currentList = {};
        $scope.newList.added = true;
        var today = new Date();
        // get imported list
        var importedList = Import.getList("list_object");

        // Create new title from imported list's title and encode it
        var title = importedList.title + " (copy)";
        var encodedTitle = encodeURI(title);
        try {
            var newListUrl = "https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid + "/lists/" + $scope.encodedTitle;
            var ref = new Firebase(newListUrl);
            $scope.currentList = $firebaseObject(ref);
        } catch (e) {
           alert("error! can't use those characters in a title");
           // Refresh page and put flash message here
        }

        $scope.currentList.title = title;
        $scope.currentList.dateCreated = (today.getMonth() + 1) + '/' + today.getDate() + '/' +  today.getFullYear();
        $scope.currentList.items = importedList.items;

        // Save the copied list.
        $scope.currentList.$save().then(function() {
          console.log("New list saved!");
        }, function(error) {
          console.log("Error:", error);
        });
    }

    $scope.createList = function (title) {

        // Create a firebase ref for the new list
        var encodedTitle = encodeURI(title);
        console.log(encodedTitle)
        try {
            var newListUrl = "https://t-and-es-grocery-app.firebaseio.com/users/" + authData.uid + "/lists/" + encodedTitle;
            var ref = new Firebase(newListUrl);
            $scope.currentList = $firebaseObject(ref);
        } catch (e) {
           alert("error! can't use those characters in a title");
           // Refresh page and put flash message here
        }

        $scope.newList.added = true;
        var today = new Date();

        // Add properties to the new list
        $scope.currentList.title = title;
        $scope.currentList.dateCreated = (today.getMonth() + 1) + '/' + today.getDate() + '/' +  today.getFullYear();
        $scope.currentList.items = [];

        // Save the new list.
        $scope.currentList.$save().then(function() {
          console.log("New list saved!");
        }, function(error) {
          console.log("Error:", error);
        });
        
    };

    $scope.editTitle = function() {
        $scope.newList.showTitleForm = !$scope.newList.showTitleForm;
        $scope.currentList.$save().then(function() {
          console.log("Title saved!");
          // Put flash message here
        }, function(error) {
          console.log("Error:", error);
          // Put flash message here
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

    $scope.removeItem = function (item) {

        var index = $scope.currentList.items.indexOf(item);
        $scope.currentList.items.splice(index, 1);
        $scope.currentList.$save().then(function() {
          console.log("item deleted!");
          // Put flash message here
        }, function(error) {
          console.log("Error:", error);
          // Put flash message here
        });  
    };

    $scope.clearNewList = function() {
        // clear new list object
        $scope.currentList == {};
        // Empty factory
        Import.emptyList();

    }

});