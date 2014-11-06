angular.module('starter.controllers', ['ionic', 'ngCordova', 'ionic.contrib.ui.cards'])

.controller('EventsListCtrl', function($scope, $stateParams) {
	$scope.type = $stateParams.type;
})


.controller('SignInCtrl', function($scope, $state) {
  
   $scope.currentUser = Parse.User.current();  
    
  $scope.state = $state;
  
  $scope.error = ""
  
  $scope.user = {};
  
  $scope.logIn = function(user) {
    Parse.User.logIn(user.email, user.password, {
      success: function(user_r) {
      console.log(user_r);
        $scope.currentUser = user_r;
        $scope.$apply();
        $scope.state.go('menu.tab.eventslist');
      },
      error: function(user, error) {
      //200 missing username
      //101 Invalid Login Parameters
		  $scope.error = error.message;
	  }
    });
  };
  
  $scope.logOut = function(form) {
    Parse.User.logOut();
    $scope.currentUser = null;
  };
  
  $scope.onChange = function() {
	  
	  console.log("HELLO");
	  
  }
  
  /*$scope.signIn = function(user) {
    console.log('Sign-In', user);
    $state.go('conferencecode');
  };*/
  
})

.directive('tqValidateAfter', [function() {
  var validate_class = "tq-validate";
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.validate = false;
      
      element.bind('focus', function(evt) {
        if(ctrl.validate && ctrl.$invalid) // if we focus and the field was invalid, keep the validation
        {
          element.addClass(validate_class);
          scope.$apply(function() {ctrl.validate = true;});
        }
        else
        {
          element.removeClass(validate_class);
          scope.$apply(function() {ctrl.validate = false;});
        }
        
      }).bind('blur', function(evt) {
        element.addClass(validate_class);
        scope.$apply(function() {ctrl.validate = true;});
      });
    }
  }
}])

.controller("SignUpCtrl", function($scope, $rootScope, $state) {


	$scope.user = {};
	$scope.user.username = "john@john.com";
	$scope.user.email = "john@john.com";
	$scope.user.first_name = "John";
	$scope.user.last_name = "Mastri";
	$scope.user.password = "john";
	
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
    var _acl = new Parse.ACL();
    _acl.setPublicReadAccess(true);
    $rootScope.user.set("ACL", _acl);
    
    console.log($rootScope.user);
    
    $state.go("uploadphoto");
      
  };
	
})

.controller("UploadPhotoCtrl", function($scope, $ionicActionSheet, $rootScope, $cordovaCamera, $upload) {
	
	
	/*
		var options = { 
        quality : 75, 
        destinationType : Camera.DestinationType.DATA_URL, 
        sourceType : Camera.PictureSourceType.CAMERA, 
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
    };
		
		
	*/
		
	/*$scope.takePicture = function(){   
    	
    	
    	$ionicActionSheet.show({
		     buttons: [
		       { text: 'Take A Photo' },
		       { text: 'Photo Library' }
		     ],
		     titleText: 'Upload A Photo',
		     cancelText: 'Cancel',
		     cancel: function() {
		          // add cancel code..
		          return true;
		        },
		     buttonClicked: function(index) {
		       
		       switch(index) {
		       case 0:
		       
		       	console.log("TAKE A PHOTO");
			   	$scope.useCamera(Camera.PictureSourceType.CAMERA);
		       	
		       	break;
		       	
		       case 1:
		       	console.log("photo LIBRARY");
		       	$scope.useCamera(Camera.PictureSourceType.PHOTOLIBRARY);
		       	
		       	break;       
			   	
			   }
			   
			   return true;
			   
		     }
		   });
    	
    	//$scope.useCamera();
    	            
    };
    
    $scope.useCamera = function(type) {
	    
	      var cameraOptions = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URI,
            sourceType: type           
         };
        var success = function(data){
        $scope.$apply(function () {
              
              //remember to set the image ng-src in $apply,
              // i tried to set it from outside and it doesn't work.
             
               $scope.cameraPic = data;//"data:image/jpeg;base64," + data;
			   $rootScope.filePath = $scope.cameraPic;
             });
         };
        var failure = function(message){
             alert('Failed because: ' + message);
        };
        //call the cordova camera plugin to open the device's camera
        navigator.camera.getPicture( success , failure , cameraOptions );  
	    
	   
    }*/
    
    $scope.fileUrl = "";
    
    $scope.onFileSelect = function($files) {
	
		console.log($files);
	
		$rootScope.filePath = $files[0];
		console.log($rootScope.filePath);
		
		$scope.reader = new FileReader();
		$scope.reader.onload = function (e) {
      		$scope.fileUrl = e.target.result;
      		$scope.$apply();
      		console.log($scope);
      	
      	};
	  	$scope.reader.readAsDataURL($files[0]);
	
	}
       
  
})


.controller("TermsCtrl", function($scope, $rootScope, $cordovaCamera, $state, $upload) {

	$scope.progress = 0;
	$scope.location = "";
	
	$scope.onFileSelect = function($files) {
	
	console.log($files);
	
	$rootScope.filePath = $files[0];
	
	/*$scope.upload = $upload.http({
        url: 'https://api.parse.com/1/files/photo.jpg', //upload.php script, node.js route, or servlet url
        method: 'POST',// or 'PUT',
        headers:{
                    'X-Parse-Application-Id' : 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key' : 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                 	'Content-Type' : 'image/jpeg'
                },
        //withCredentials: true,
        data: $files[0],
        //file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
      });*/
	
    //$files: an array of files selected, each file has name, size, and type.
    /*for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      $http.uploadFile({
        url: 'my/upload/url',
        file: $file
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      }); 
    }*/

  }
	
	$scope.signUp = function() {
		
		$scope.upload = $upload.http({
        url: 'https://api.parse.com/1/files/photo.jpg', //upload.php script, node.js route, or servlet url
        method: 'POST',// or 'PUT',
        headers:{
                    'X-Parse-Application-Id' : 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key' : 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                 	'Content-Type' : 'image/jpeg'
                },
        //withCredentials: true,
        data: $rootScope.filePath,
        //file: file, // or list of files ($files) for html5 only
        //fileName: 'doc.jpg' or ['1.jpg', '2.jpg', ...] // to modify the name of the file(s)
        // customize file formData name ('Content-Disposition'), server side file variable name. 
        //fileFormDataName: myFile, //or a list of names for multiple files (html5). Default is 'file' 
        // customize how data is added to formData. See #40#issuecomment-28612000 for sample code
        //formDataAppender: function(formData, key, val){}
      }).progress(function(evt) {
        $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        console.log(status);
        console.log(headers);
        console.log(config);
                
        $scope.createAccount(data);
        
        if(navigator.camera) navigator.camera.cleanup();
        
        
      });

		
	}
	
	$scope.createAccount = function(data) {
		
		data.__type = "File";
		$rootScope.user.set("image", data);
		$rootScope.user.signUp(null, {
			  success: function(user) {
			   
			    console.log("SUCCESSAFULLY CREATED ");
			    console.log(user);
			    
				$state.go("menu.tab.eventslist");
			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("User Creation Error : " + error.code + " " + error.message);
			  }
			});
	      
	      
	      //associate image with user;
		
		
	}
	
 
	
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
		/*var options = {
	    
	    	headers:{
                    'X-Parse-Application-Id' : 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key' : 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                 	'Content-Type' : 'image/jpeg'
                }
                ,
               mimeType :"image/jpeg",
               fileName : "photo.jpg",
               chunkedMode : false
         }	    
	    
	    
	    var id = "photo";//'_' + Math.random().toString(36).substr(2, 9);
	    
	    $cordovaFile
	    .uploadFile("https://api.parse.com/1/files/" + id + ".jpg", $rootScope.filePath, options)
	    .then(function(result) {
	      // Success! 
	      
	      console.log(result);
	      $scope.progress = result.headers.Location;
	      console.log(result.headers.Location);
	      $scope.location = result.headers.Location;
	      */
	      /*
	      $rootScope.user.set("image", new Parse.ACL());
	      
	      // create user
	      $rootScope.user.signUp(null, {
			  success: function(user) {
			    // Hooray! Let them use the app now.
			  },
			  error: function(user, error) {
			    // Show the error message somewhere and let the user try again.
			    alert("Error: " + error.code + " " + error.message);
			  }
			});
	      */
	      
	      //associate image with user;
	      //$state.go("menu.tab.eventslist");
	      /*
	    }, function(err) {
	      // Error
	    }, function (progress) {
	      // constant progress updates
	      	$scope.progress = (progress.loaded/progress.total);	      	
	      	//loaded / total 
	      
	    });
	    
	    //$state.go("menu.tab.eventslist"); */
    
    
    

	
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
  
  $scope.MyEvents = function (user) {
	  
	  $state.go("menu.tab.eventslist");
	  
  }
  
  $scope.swipe = function (direction) 
   {
        console.warn('Swipe:  ' + direction);
        //$ionicNavBarDelegate.back();
        
    }
  
})


.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };  
  
  var _a = Parse.User.current().attributes;
  $scope.name = _a.first_name + " " + _a.last_name;
    		
	//google.maps.event.addDomListener($window, 'load', $scope.initialize);


 })


.controller('FacesCtrl', function($scope, Peeps) {
	
	
	
})


.directive('noScroll', function($document) {

  return {
    restrict: 'A',
    link: function($scope, $element, $attr) {

      $document.on('touchmove', function(e) {
        e.preventDefault();
      });
    }
  }
})

.controller('CardsCtrl', function($scope, $ionicSwipeCardDelegate, Peeps) {

	console.log($scope.$parent.peeps);
	
	//$scope.cards = $scope.$parent.peeps;
		
	$scope.peeps = [];
			
	Peeps.get().success(
		function(response) {
			
		console.log(response.results);				
		//$scope.peeps = response.results;
		var r = response.results;
		for(var a = 0 ; a < r.length ; a++) {
			var p = r[a];
			console.log(p);
			if(p.events_attending) {
				if(p.events_attending.length > 0 || p.events_maybe.length > 0) {
					$scope.peeps.push(p);
				}
			}
			
		}
		
		var cardTypes = $scope.peeps;
				
  $scope.cards = Array.prototype.slice.call(cardTypes, 0, 0);

  $scope.cardSwiped = function(index) {
    $scope.addCard();
  };

  $scope.cardDestroyed = function(index) {
    $scope.cards.splice(index, 1);
  };

  $scope.addCard = function() {
    var newCard = cardTypes[Math.floor(Math.random() * cardTypes.length)];
    newCard.id = Math.random();
    $scope.cards.push(angular.extend({}, newCard));
  }
	});
	
})

.controller('CardCtrl', function($scope, $ionicSwipeCardDelegate, $state, Peeps) {
  $scope.showEvents = function(card) {
   	Peeps.setCurrentPeep(card);
   	$state.go("menu.tab.faces_events");
   	console.log(card);
   
  };
})


.controller('PeepEventCtrl', function($scope, Peeps, Events, $state) {

	$scope.$root.tabsHidden = "";

	$scope.current_peep = Peeps.getCurrentPeep();
  
	$scope.generateList = function(response) {
			
		console.log(response);
			
		$scope.events_created = response.events_created;
		$scope.events_attending = response.events_attending;
		$scope.events_maybe = response.events_maybe;
		
	}
	
	$scope.generateList($scope.current_peep);
	
	$scope.showDetail = function(item) {
		
		console.log(item);
		Events.setEventDetail(item);
		$state.go("menu.tab.faces_events_detail")
		
	}

})


.controller('TrendingCtrl', function($scope) {
		
	
})

.controller('PlacesCtrl', function($scope) {
	
	$scope.place = null;
	
})


.controller('EventListViewCtrl', function($scope, $state, $ionicModal, $rootScope, Events) {
	
	//<select style="opacity:0; width:100%; position:absolute; z-index=100" ng-options="option for option in question.options">
	//<select ng-model="myColor" ng-options="color.name for color in colors">
	
	$scope.$root.tabsHidden = "";
	//Eat/Drink, Live Events, Sports, Group Events, Out of the Box
	$scope.select_options = [{name:"basics", values:["Eat/Drink","Live Events","Sports","Group Events","Out of the Box","View All"]}];//,
						     //{name:"impulses", values:["Buy","Wild","Sexy","Smart","Weird"]},
						     //{name:"basics", values:["Eat","Sleep","Walk","Run","Dance"]}];
	
	//$scope.correctlySelected = $scope.options[1];
	$scope.view_select_value = $scope.select_options[0];
	
	
	$scope.$watch('view_select_value', function() {
        $scope.list_values = $scope.view_select_value.values;
    });
    
    $scope.showBy = function(arg) {
	    	    
	    $scope.type = $scope.view_select_value.name;
	    $scope.subtype = arg.toLowerCase();
	
	    $scope.items = null;
		console.log($scope.type + " " + $scope.subtype);
		
		if($scope.subtype == "view all") {
		
			Events.getAll().finally( function() {
			
				console.log("get all events");			
				$state.go("menu.tab.events_view");
			
			});
		
		} else {
		
			Events.getType($scope.type, $scope.subtype).finally( function() {
			
				console.log("turn off loading icon");			
				$state.go("menu.tab.events_view");
			
			});	    
		
		}
    }
    
    $scope.createEvent = function() {
	    
	    $rootScope.event_header = "create";
	    $scope.modal.show();
	    
    }
	  		
})

.controller('CreateEventCtrl', function($scope, $http, $state, $filter, $rootScope, $ionicPopover, Events, Shared) {

	$scope.event = Events.detail;
	
	console.log("SCOPE EVENT");
	console.log($scope.event);

	
	$scope.$on('modal.shown', function() {

    	console.log($rootScope.event_header);
		switch($rootScope.event_header) {
			
			case "create":
			
				$scope.header = "Create An Event";
				$scope.event.title = "";
				$scope.event.description = "";
				$scope.event.date_start = $filter("date")(Date.now(), 'yyyy-MM-dd');
				$scope.event.time_start = "12:00";				
				$scope.event.users_attending = [];
				$scope.event.users_maybe = [];
				$scope.event.location = "";
				
				Events.setEventDetail($scope.event);				
								
				$rootScope.button_label = "Create Event";
				break;
				
			case "edit":
				
				$rootScope.button_label = "Update Event";			
				$scope.header = "Edit Event";
				break;
				
			case "update":
			
				$rootScope.button_label = "Update Event";			
				$scope.header = "Edit Event";
				break;
			
		}
  });
  
  	$scope.address = Shared.shared;
  	console.log("address:");
  	console.log($scope.address);
  
	$scope.pop = function($event) {
				
	  $rootScope.popover.show($event);
		
	}
	
	$scope.cancelCreateEvent = function() {
		
		$scope.modal.hide();
				
	}
	
	$scope.previewEvent = function(event) {
		
		console.log("PREVIEW EVENT");
		$scope.modal.hide();
		event.mode = "preview";
		event.modal = $scope.modal;
		event.location = $scope.address;
		Events.setEventDetail(event);
		$state.go("menu.tab.event_detail");
	}	 	

})

.controller('PopoverCtrl', function($scope, $rootScope, Shared) {
	
	$scope.event = {};
	$scope.event.location = "";
	
	$scope.callback = function(predictions, status) {
	  
	  console.log(predictions);
	  $scope.list_values = predictions;
	  
	}
  
  	$scope.service = new google.maps.places.AutocompleteService();
  	
  	$scope.$watch('event.location', function(nv, ov) {
		if(nv.length > 0)
		$scope.service.getPlacePredictions({ input: $scope.event.location }, $scope.callback);
		
		
	});
	
	$scope.selectAddress = function(address) {
		
		console.log(address);
		Shared.set(address);
		$rootScope.popover.hide();
		
	}
		
	
	
	
})

.controller('EventDetailCtrl', function($scope, $http, $rootScope, Events, MyEvents) {
		
	$scope.event_data = Events.getEventDetail();	
	
	$scope.$root.tabsHidden = "tabs-hide";
	
	$scope.hideNav = ($scope.event_data.mode === "preview") ? true : false;
	
	
	$scope.bl = $rootScope.button_label;
	
	console.log($scope.bl);
		
	console.log($scope.event_data);
	
	
	//WORKING WITH INVERSE RELATION
	/*
	var _u = Parse.User.current();
	var _p = {__type:"Pointer", className:"_User", objectId:_u.id};
	var _o = {object:_p, key:"attending"};
	var _w = {$relatedTo:_o };
	
	_w = JSON.stringify(_w);
	*/
	
	///DO NOT DELETE - DEFERRING ATTENDANCE COUNT TO GETYPE METHOD FOR NOW.  WILL NEED
	///TO LOAD SPECIFIC DETAIL INFO ONCE APP GROWS
	
	/*
	$http.get('https://api.parse.com/1/classes/events/' + $scope.event_data.objectId,
           	 {
	        	 headers:{
                    'X-Parse-Application-Id': 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key': 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                    //'X-Parse-Session-Token' : _st,
                    'Content-Type' : 'application/json'
                },               
                params: {include:"users_attending,users_maybe" } 
                
              }).success( function(response) { 
              	
              		console.log(response);
              	
               })
      */         
              		
	  ///END DO NOT DELETE
	
	
	$scope.setStatus = function(status) {
		
		if($scope.event_data.mode != "preview") {
			console.log("set attending");
			var data = $scope.event_data;
			Events.updateAttendStatus(data, ["users_attending","users_maybe",status],["Remove","Remove","AddUnique"]).success( function(response) {
			 	
			 	//Update User's events
			 	var us = (status == "users_attending") ? "events_attending" : "events_maybe";
			 	MyEvents.updateEventStatus($scope.event_data, ["events_attending","events_maybe",us],["Remove","Remove","AddUnique"]);
			 	
			 	console.log("UPDATE COUNT VISUALLY");
			 	console.log(response);
			 	$scope.event_data.users_attending = response.users_attending;
			 	$scope.event_data.users_maybe = response.users_maybe;
			 
			 });
			
			
		} else {
			console.log("I'm in preview mode");	
		}
		
	}
	
	$scope.setMaybe = function() {
		
		if($scope.event_data.mode != "preview") {
			console.log("set maybe");
		} else {
			console.log("I'm in preview mode maybe");	
		}
		
	}
	
	$scope.editEvent = function() {
		
		console.log("EDIT EVENT");
		$rootScope.event_header = "edit";
		$rootScope.modal.show();
		
	}
	
	$scope.createEvent = function($state, $ionicModal) {
	
		var _re = $scope.event_data;
		var _e = {};
				
		_e.title = _re.title;
		_e.description = _re.description;
		_e.date_start = _re.date_start;
		_e.location = _re.location;
		//NEED TO UPDATE FORM TO REFLECT THESE OPTIONS
		_e.impulses = "";
		_e.basics = "eat/drink";
		_e.senses = "";		
		
		if($rootScope.event_header == "create") {
			
			$scope.doCreate(_re, _e);
			
		} else {
			
			$scope.doUpdate(_re, _e);
			
		}	
 		
	}
	
	$scope.doCreate = function(_re, _e) {
		
		var user = Parse.User.current();
 		
 		_e.creator = {
		  "__type": "Pointer",
		  "className": "_User",
		  "objectId": user.id
		}
			
		//DO NOT DELETE - ADDING USER TO RELATION
		/*_e.attending = {
		  "__op": "AddRelation",
		  "objects":[{"__type":"Pointer","className": "_User","objectId":user.id}]};
		*/
		
		_e.users_attending = {
		  "__op": "AddUnique",
		  "objects":[{"__type":"Pointer","className": "_User","objectId":user.id}]};
		
		_e.users_maybe = [];
				
		//add ACL		
		
 		Events.create(_e).success(function(data) {
 			
 			//associate user with event and set attending status
 			MyEvents.updateEventStatus(data, ["events_created","events_attending"],["AddUnique","AddUnique"])
 		
 		console.log(data);
	 	$scope.event_data.users_attending = [1];
		$scope.event_data.mode = "view";	 		
		$scope.event_data.objectId = data.objectId;
  			//hides div - probably a better idea to remove completely
 			$scope.hideNav = false;
 					
		});	
		
	}
	
	$scope.doUpdate = function(_re, _e) {
		
		Events.edit(_re.objectId, _e).success( function(response) {
			
			$scope.event_data.mode = "view";
			$scope.hideNav = false;
			
		})
		
	}
	
})

.controller('ListEvents', ['$scope', 'Events', function($scope, Events) {

	Events.getAll().success(function(data) { 		
 			$scope.items = data.results;
 	});
 
}])

.controller('EventsViewCtrl', function($scope, $state, $stateParams, $ionicModal, Events) {

	
	$scope.$root.tabsHidden = "";
		
	$scope.type = Events.getTypeData().type;
	$scope.subtype = Events.getTypeData().subtype;
	
	$scope.items = Events.getEventData();
		
	$scope.loadEventDetail = function(item) {
	
		console.log("LOAD EVENT DETAIL");
		console.log(item);
		Events.setEventDetail(item);
		$state.go("menu.tab.event_detail");
	
	}
	
	/*
	$scope.type = $stateParams.type;
	$scope.subtype = $stateParams.subtype;
	console.log($scope.items);
	*/
	//$scope.doRefresh = function() {
			
	/*
	}.finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
    */
	
	//$ionicNavBarDelegate.back();	
	
	/*
	$ionicModal.fromTemplateUrl('templates/events-create.html', function (modal) {
	    $scope.modal = modal;
	  }, {
	    animation: 'slide-in-up'
	  });
	*/
		
})


.controller('ShowEventDetailCtrl', function($scope) {

	
})



//Menu Controls

/*
	
                 //'where={"$relatedTo":{"object":{"__type":"Pointer","className":"Post","objectId":"8TOXdXf3tz"},"key":"likes"}}'               
                //{where: {"$relatedTo": {"object":{"__type":"Pointer","className":"_User","objectId":_u.id},"key":"events_created"}}}//{include : "events_created"} 
	
				 //params: {where: {"$relatedTo": {"object":{"__type":"Pointer","className":"_User","objectId":_u.id},"key":"events_created"}} }//{include:"events_created"}
	
*/


.controller('MyEventsCtrl', function($scope, $state, $rootScope, $ionicPopup, $http, Events, MyEvents) {

	$scope.data = {showDelete: false};
	
	var _u = Parse.User.current();
	var _st = _u._sessionToken;
	
	$scope.createEvent = function() {
		
		$rootScope.event_header = "create";
		$rootScope.modal.show();
		
	}
	       
    console.log(MyEvents.all());
    
    $scope.generateList = function(response) {
			
		$scope.events_created = response.events_created;
		$scope.events_attending = response.events_attending;
		$scope.events_maybe = response.events_maybe;
		
	}
	
	$scope.getMyEvents = function() {
		
		MyEvents.get().success( function(response) { 
              	
             console.log(response);
			 $scope.generateList(response);
              	
       });
		
	}	
    
	//if(MyEvents.all() == null) {
	
       $scope.getMyEvents();
       
    /*} else {
    
    	var response = MyEvents.all();
	    $scope.generateList(response);
	    
    }*/
	
	
	$scope.showDetail = function(item) {
		
		console.log(item);
		Events.setEventDetail(item);
		$state.go("menu.tab.event_detail")
		
	}
	
	$scope.editEvent = function(item) {
		
		console.log("edit this event");
		console.log(item);
		$rootScope.event_header = "update";
		Events.setEventDetail(item);
		$rootScope.modal.show();
		
	}
	
	$scope.deleteEvent = function(item) {
		
		console.log("delete this event");
		//add popup to confirm delete
		$scope.showConfirm(item);
		
		
	}
	
	$scope.showConfirm = function(item) {
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Delete Event',
	     template: 'Are you sure you want to delete this event?'
	   });
	   confirmPopup.then(function(res) {
	     if(res) {
	       console.log('You are sure');
	       
	       console.log(item.objectId);
	       //update database
	       //DELETE EVENT THEN UPDATE POINTER ARRAY	       
	       Events.delete(item.objectId).success( function() {	
	       
	           console.log("DELETED FROM EVENTS");       
	       
		       MyEvents.updateEventStatus(item, ["events_created","events_attending"], ["Remove","Remove"])
		       .success( function() {
			       
			       $scope.getMyEvents();
			       
		       });
		       console.log("delete");
		       console.log(item);
		       
		       //refresh this view
		       //$scope.getMyEvents();
		       
		   });
		   
		     } else {
		       console.log('You are not sure');
		     }
		   });   
	 };
	 
	 $scope.removeEvent = function(item) {
		 
		 console.log("REMOVE FROM ATTENDING/MAYBE");
		 $scope.showRemoveConfirm(item);
	 }	
	 
	 
	 $scope.showRemoveConfirm = function(item) {
	 
	   var confirmPopup = $ionicPopup.confirm({
	     title: 'Remove Event',
	     template: 'Are you sure you want to remove this event?'
	   });
	   
	   confirmPopup.then(function(res) {
	     if(res) {
	       console.log('You are sure');	       
	       console.log(item.objectId);	       
	       
	        MyEvents.updateEventStatus(item, ["events_maybe","events_attending"], ["Remove","Remove"])
		       .success( function() {
			       
			       console.log("removed");
			       $scope.getMyEvents();
			       
		       });
		       	       
		       
		   }
		   });
		   	 
	 }
	 
	 
	 $scope.changeStatus = function(item, status) {
		 
 		 MyEvents.updateEventStatus(item, ["events_maybe","events_attending",status], ["Remove","Remove","AddUnique"])
       .success( function() {
	       
	       var us = (status == "events_attending") ? "users_attending" : "users_maybe";
	       Events.updateAttendStatus(item, ["users_attending","users_maybe",us],["Remove","Remove","AddUnique"])
	       console.log("status changed");
	       $scope.getMyEvents();
	       
       });		 
	 }
})



.controller('ProfileCtrl', function($scope, Profile) {
	
	
	Profile.get().success(function(response) {
		
		$scope.profile = response;
		console.log($scope.profile);
		
	})
	
})

.controller('AboutCtrl', function($scope) {
	
	
})

.controller('RequestCodeCtrl', function($scope) {
	
	
})

.controller('TermsViewOnlyCtrl', function($scope) {
	
	
})

.controller('LogOutCtrl', function($scope, $state) {
	
	$scope.logOut = function() {
		Parse.User.logOut();
		$state.go("signin");
	}
	
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
})

*/


;

function MyCtrl($scope) {
    $scope.gPlace;
}


