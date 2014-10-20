angular.module('starter.controllers', ['ionic', 'ui.bootstrap.datetimepicker', 'ion-google-place'])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
})

.controller('Logins', function($scope) {

  $scope.scenario = 'Sign up';
  $scope.currentUser = Parse.User.current();
  
  $scope.signUp = function(form) {
  
  	Parse.Cloud.run('hello', {}, {
	  success: function(result) {
	    // result is 'Hello world!'
	    console.log(result);
	  },
	  error: function(error) {
	  }
	});
  
    var user = new Parse.User();
    user.set("email", form.email);
    user.set("username", form.username);
    user.set("password", form.password);
    user.set("ACL", new Parse.ACL());
    
    user.signUp(null, {
      success: function(user) {
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to sign up:  " + error.code + " " + error.message);
      }
    });    
  };
  
  $scope.logIn = function(form) {
    Parse.User.logIn(form.username, form.password, {
      success: function(user) {
      console.log(user);
        $scope.currentUser = user;
        $scope.$apply();
      },
      error: function(user, error) {
        alert("Unable to log in: " + error.code + " " + error.message);
      }
    });
  };
  
  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  };
})

.controller('CreateEvent', ['$scope', '$http','Events', function($scope, $http, Events) {

	$scope.create = function(event) {
		
		
		console.log(event);
 		var ev = {title:event.title};
 		var user = Parse.User.current();
 		console.log("UERSER");
 		console.log(user);
 		ev.creator = {
		  "__type": "Pointer",
		  "className": "_User",
		  "objectId": user.id
		}
		
 		Events.create(ev).success(function(data) { 		
 			console.log(data);
 			var _st = Parse.User.current()._sessionToken;
 			$http.put('https://api.parse.com/1/users/' + Parse.User.current().id, 
			 	//{"email" : "something@so.com"},
                //{"__type":"Relation","className":"created_events","objectId": data.objectId},
                {"created_events":{"__op":"AddRelation","objects":[{"__type":"Pointer","className":"events","objectId":data.objectId}]}},
                {headers:{
                    'X-Parse-Application-Id' : 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key' : 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                    'X-Parse-Session-Token' : _st,
                 	'Content-Type' : 'application/json'
                }
			}).success(function(data) {console.log(data) }).
			error(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});
			
		});
 	}
 	
 	/*
 	// update content
 	var _st = Parse.User.current()._sessionToken;
 	$http.put('https://api.parse.com/1/users/' + Parse.User.current().id, 
			 	{"email" : "something@so.com"},
                {headers:{
                    'X-Parse-Application-Id' : 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key' : 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                    'X-Parse-Session-Token' : _st,
                 	'Content-Type' : 'application/json'
                }
			}).success(function(data) {console.log(data) }).
			error(function(data, status, headers, config) {
				console.log(data);
				console.log(status);
				console.log(headers);
				console.log(config);
			});

			
			} */ 

}])


.controller('ListEvents', ['$scope', 'Events', function($scope, Events) {


	Events.getAll().success(function(data) { 		
 			$scope.items = data.results;
 	});
 
}])

.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('conferencecode');
  };
  
})

.controller('ForgotPasswordCtrl', function($scope, $ionicNavBarDelegate) {
  
  $scope.swipe = function (direction) 
   {
        console.warn('Swipe:  ' + direction);
        $ionicNavBarDelegate.back();
    }
  
})

.controller('ConferenceCodeCtrl', function($scope, $state, $ionicNavBarDelegate) {
  
  //$state.go('tab.home');
  
  $scope.submitCode = function (user) {
	  
	  $state.go("tab.home");
	  
  }
  
  $scope.swipe = function (direction) 
   {
        console.warn('Swipe:  ' + direction);
        $ionicNavBarDelegate.back();
        
    }
  
})


.controller('EventListViewCtrl', function($scope, $ionicModal) {
	
	//<select style="opacity:0; width:100%; position:absolute; z-index=100" ng-options="option for option in question.options">
	//<select ng-model="myColor" ng-options="color.name for color in colors">
	
	$scope.select_options = [{name:"senses", values:["Touch","Taste","Smell","Hear","See"]},
						     {name:"impulse", values:["Buy","Wild","Sexy","Smart","Weird"]},
						     {name:"basics", values:["Eat","Sleep","Walk","Run","Dance"]}];
	
	//$scope.correctlySelected = $scope.options[1];
	$scope.view_select_value = $scope.select_options[0];
	
	
	$scope.$watch('view_select_value', function() {
        $scope.list_values = $scope.view_select_value.values;
    });
	
	console.log($scope.view_select_value);
	
	 $ionicModal.fromTemplateUrl('my-modal.html', function (modal) {
	    $scope.modal = modal;
	  }, {
	    animation: 'slide-in-up',
	    focusFirstInput: true
	  });
	
		
})
/*
.controller('ModalCtrl', function($scope, $ionicPopup, $filter) {
  
  $scope.newUser = {};

  $scope.$watch('newUser.birthDate', function(unformattedDate){
    $scope.newUser.formattedBirthDate = $filter('date')(unformattedDate, 'dd/MM/yyyy HH:mm');
  });

  $scope.createContact = function() {
    console.log('Create Contact', $scope.newUser);
    $scope.modal.hide();
  };
    
  $scope.openDatePicker = function() {
    $scope.tmp = {};
    $scope.tmp.newDate = $scope.newUser.birthDate;
    
    var birthDatePopup = $ionicPopup.show({
     template: '<datetimepicker ng-model="tmp.newDate"></datetimepicker>',
     title: "Birth date",
     scope: $scope,
     buttons: [
       { text: 'Cancel' },
       {
         text: '<b>Save</b>',
         type: 'button-positive',
         onTap: function(e) {
           $scope.newUser.birthDate = $scope.tmp.newDate;
         }
       }
     ]
    });
  }
});*/


.controller('PlacesCtrl', function($scope) {
	
	$scope.place = null;
	'ion-google-place'
	
})

/*
.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            console.log(element[0]);
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
 
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                	console.log("FUCK");
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
})
//myApp.factory('myService', function() {});
 /*
function MyCtrl($scope) {
    $scope.gPlace;
}*/




/*

.directive('myDateTimePicker', function ($ionicPopup) {
  return {
    restrict: 'E',
    template: '<input class="my-date-time-picker" type="text" readonly="readonly" ng-model="formatted_datetime" ng-click="popup()" placeholder="{{placeholder}}">',
    scope: {
      'title': '@',
      'dateModel': '=ngModel',
      'placeholder': '@'
    },
    controller : function($scope, $filter, $ionicPopup) {
      $scope.tmp = {};
      $scope.tmp.newDate = $scope.dateModel || Date.now();
      
      $scope.onTimeSet = function(newDate, oldDate) {
        console.log('Selected Date from Old date', oldDate, ' to ', newDate);
      };
 
      $scope.popup = function() {
        $ionicPopup.show({
          template: '<div class="my-date-time-picker"><datetimepicker data-ng-model="tmp.newDate" data-on-time-set="onTimeSet"></datetimepicker></div>',
          title: $scope.title,
          scope: $scope,
          buttons: [
            {text: 'Cancel'},
            {
              text: '<b>Choose</b>',
              type: 'button-positive',
              onTap: function(e) {
                //$scope.$apply(function() { //error: apply already in progress
                  $scope.dateModel = $scope.tmp.newDate;
                  $scope.formatted_datetime = $filter('date')($scope.tmp.newDate, 'medium');
                //});
              }
            } //second button
          ] //buttons array
        }); //ionicpopup.show
      }; //scope.popup();
    }
  };
})*/
;

function MyCtrl($scope) {
    $scope.gPlace;
}


