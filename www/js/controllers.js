angular.module('starter.controllers', ['ionic', 'ui.bootstrap.datetimepicker', 'ion-google-place'])

.controller('EventsListCtrl', function($scope, $stateParams) {
	$scope.type = $stateParams.type;
})
/*
.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})
*/

.controller('LoginCtrl', function($scope, $state) {

 // $scope.scenario = 'Sign up';
  $scope.currentUser = Parse.User.current();  
    
  $scope.state = $state;
  
  $scope.logIn = function(user) {
    Parse.User.logIn(user.email, user.password, {
      success: function(user_r) {
      console.log(user_r);
        $scope.currentUser = user_r;
        $scope.$apply();
        $scope.state.go('conferencecode');
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



.controller('SignInCtrl', function($scope, $state) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('conferencecode');
  };
  
})

.controller("SignUpCtrl", function($scope, $rootScope, $state) {
	
	$scope.signUp = function(form) {
  
  	/*Parse.Cloud.run('hello', {}, {
	  success: function(result) {
	    // result is 'Hello world!'
	    console.log(result);
	  },
	  error: function(error) {
	  }
	});*/
  
    $rootScope.user = new Parse.User();
    $rootScope.user.set("username", form.email);
    $rootScope.user.set("email", form.email);
    $rootScope.user.set("first_name", form.first_name);
    $rootScope.user.set("last_name", form.last_name);
    $rootScope.user.set("password", form.password);
    $rootScope.user.set("ACL", new Parse.ACL());
    
    console.log($rootScope.user);
    
    $state.go("uploadphoto");
      
  };
	
})

.controller("UploadPhotoCtrl", function($scope) {
	
	
})

.controller("TermsCtrl", function($scope, $rootScope, $state) {

	$scope.signUp = function() {
	
		/*var user = $rootScope.user;
		
		 user.signUp(null, {
	      success: function(user) {
	        $scope.currentUser = user;
	        $scope.$apply();
	        console.log("SIGNED UP");
	        console.log(user);
	        
	        $state.go("menu.tab.eventslist");
	        
	      },
	      error: function(user, error) {
	        alert("Unable to sign up:  " + error.code + " " + error.message);
	      }
	    });*/
	    
	    $state.go("menu.tab.eventslist"); 
    
    }
	
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
	  
	  $state.go("tab.eventslist");
	  
  }
  
  $scope.swipe = function (direction) 
   {
        console.warn('Swipe:  ' + direction);
        $ionicNavBarDelegate.back();
        
    }
  
})




.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };   
             
  /*$ionicModal.fromTemplateUrl('modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up'
  });*/

 })



.controller('EventListViewCtrl', function($scope, $ionicModal) {
	
	//<select style="opacity:0; width:100%; position:absolute; z-index=100" ng-options="option for option in question.options">
	//<select ng-model="myColor" ng-options="color.name for color in colors">
	
	$scope.select_options = [{name:"senses", values:["Touch","Taste","Smell","Hear","See"]},
						     {name:"impulses", values:["Buy","Wild","Sexy","Smart","Weird"]},
						     {name:"basics", values:["Eat","Sleep","Walk","Run","Dance"]}];
	
	//$scope.correctlySelected = $scope.options[1];
	$scope.view_select_value = $scope.select_options[0];
	
	
	$scope.$watch('view_select_value', function() {
        $scope.list_values = $scope.view_select_value.values;
    });
    
    $scope.showBy = function(arg) {
	    
	    console.log(arg);
	    
    }
    
    /////
    
    	
	 $ionicModal.fromTemplateUrl('templates/my-modal.html', function (modal) {
	    $scope.modal = modal;
	  }, {
	    animation: 'slide-in-up',
	    focusFirstInput: true
	  });
	  		
})

.controller('ModalCtrl', function($scope, $ionicPopup, $filter, $ionicModal) {
  
  $scope.event = {};
  
  $scope.createEvent = function() {
	  	  
  };

})

.controller('CreateEventCtrl', ['$scope', '$http','Events', function($scope, $http, Events) {

	$scope.event = null;
	$scope.createEvent = function(event) {
				
		console.log(event); 		
 		var user = Parse.User.current();
 		console.log(user);
 		event.creator = {
		  "__type": "Pointer",
		  "className": "_User",
		  "objectId": user.id
		}
		
 		Events.create(event).success(function(data) { 		
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
				$scope.modal.hide();
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

.controller('EventDetailCtrl', function($scope) {
		
	
})


.controller('FacesCtrl', function($scope) {
		
	
})

.controller('TrendingCtrl', function($scope) {
		
	
})

.controller('PlacesCtrl', function($scope) {
	
	$scope.place = null;
	
})

.controller('ListEvents', ['$scope', 'Events', function($scope, Events) {

	Events.getAll().success(function(data) { 		
 			$scope.items = data.results;
 	});
 
}])

.controller('EventsViewCtrl', function($scope, $stateParams, Events) {
	
	$scope.type = $stateParams.type;
	$scope.subtype = $stateParams.subtype;
	console.log($scope.items);
	if($scope.items == undefined) {
		
		$scope.items = null;
		console.log($scope.type + " KTY");
		Events.getType($scope.type, $scope.subtype).success(function(data) { 		
	 			$scope.items = data.results;
	 			console.log($scope.items);
	 	});
	 	
 	} 

})


//Menu Controls


.controller('MyEventsCtrl', function($scope) {

	$scope.data = {
		showDelete: false		
	}
	
	$scope.items = [{title:"My Event 1", description:"My Event Description Goes Here"},
	{title:"My Event 2", description:"My Event Description Goes Here"},
	{title:"My Event 3", description:"My Event Description Goes Here"},
	{title:"My Event 4", description:"My Event Description Goes Here"}];
	
	$scope.editEvent = function(item) {
		
		console.log("edit this event");
		
	}
	
	$scope.deleteEvent = function(item) {
		
		console.log("delete this event");
		
	}
	
})

.controller('ProfileCtrl', function($scope) {
	
	
})

.controller('AboutCtrl', function($scope) {
	
	
})

.controller('RequestCodeCtrl', function($scope) {
	
	
})

.controller('TermsViewOnlyCtrl', function($scope) {
	
	
})

.controller('LogOutCtrl', function($scope) {
	
	
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
})




;

function MyCtrl($scope) {
    $scope.gPlace;
}


