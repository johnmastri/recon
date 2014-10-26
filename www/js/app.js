// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js



Parse.initialize("jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA", "Pge7WSHTkSVAa6kv6APQM9s39R07Cx2IXqW3BZJa"); 

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  
  
/*

angular.module('AuthApp', [])
.run(['$rootScope', function($scope) {
  $scope.scenario = 'Sign up';
  $scope.currentUser = Parse.User.current();
  
  $scope.signUp = function(form) {
    var user = new Parse.User();
    user.set("email", form.email);
    user.set("username", form.username);
    user.set("password", form.password);
    
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
}
	  
  */
  
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // SIGN IN SIGN UP FORGOT PASSWORD CONFERENCE CODE
    .state('signin', {
      url: '/sign-in',
      templateUrl: 'templates/start/sign-in.html',
      controller: 'SignInCtrl'
    })
    
    .state('forgotpassword', {
      url: '/forgot-password',
      templateUrl: 'templates/start/forgot-password.html',
      controller: 'ForgotPasswordCtrl'
    })
 
     .state('signup', {
      url: '/sign-up',
      templateUrl: 'templates/start/sign-up.html',
      controller: 'SignUpCtrl'
    })
    
    .state('uploadphoto', {
      url: '/upload-photo',
      templateUrl: 'templates/start/upload-photo.html',
      controller: 'UploadPhotoCtrl'
    })
    
    .state('terms', {
      url: '/terms',
      templateUrl: 'templates/start/terms.html',
      controller: 'TermsCtrl'
    })
   
	.state('conferencecode', {
      url: '/conference-code',
      templateUrl: 'templates/start/conference-code.html',
      controller: 'ConferenceCodeCtrl'
    })
    

    
    // MAIN APP
    
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'MenuCtrl'
    })
    
    .state('menu.tab', {
      url: "/tab",
      //abstract: true,
      views: {
      	'menuContent' : {
      		templateUrl: "templates/tabs.html"
      	}
	  }
    })

    .state('menu.tab.eventslist', {
      url: '/eventslist',
      views: {
        'tab-eventslist': {
          templateUrl: 'templates/events-list.html',
          controller: 'EventsListCtrl'
        }
      }
    })

      
    .state('menu.tab.faces', {
      url: '/faces',
      views: {
        'tab-faces': {
          templateUrl: 'templates/faces.html',
          controller: 'FacesCtrl'
        }
      }
    })

    .state('menu.tab.trending', {
      url: '/trending',
      views: {
        'tab-trending': {
          templateUrl: 'templates/trending.html',
          controller: 'TrendingCtrl'
        }
      }
    })
    
     .state('menu.events', {
      url: '/events_view/:type/:subtype',
      views: {
	 	'menuContent': {
	 		templateUrl: 'templates/events-view.html',
	  		controller: 'EventsViewCtrl'
	  	}
	  }
    })   
    
    .state('menu.event_detail', {
      url: '/event_detail/:id',
      views: {
	 	'menuContent': {
	 		templateUrl: 'templates/event-detail.html',
	  		controller: 'EventDetailCtrl'
	  	}
	  }
    }) 

    
    .state('menu.myevents', {
	    url:"/myevents",
	    views: {
	    'menuContent': {
	    	templateUrl: 'templates/menu/my-events.html',
	    	controller: 'MyEventsCtrl'
	    }
	  }    
    }) 
    
        
    .state('menu.about', {
	    url:"/about",
	    views: {
	    'menuContent': {
	    	templateUrl: 'templates/menu/about.html',
	    	controller: 'AboutCtrl'
	    }
	  }    
    })
    
    .state('menu.profile', {
	    url:"/profile",
	    views: {
	    'menuContent': {
	    	templateUrl: 'templates/menu/profile.html',
	    	controller: 'ProfileCtrl'
	    }
	  }    
    })
    
    .state('menu.requestcode', {
	    url:"/requestcode",
	    views: {
	    'menuContent': {
	    	templateUrl: 'templates/menu/requestcode.html',
	    	controller: 'RequestCodeCtrl'
	    }
	  }    
    })
    
    .state('menu.termsviewonly', {
	    url:"/termsviewonly",
	    views: {
	    'menuContent': {
	    	templateUrl: 'templates/menu/termsviewonly.html',
	    	controller: 'TermsViewOnlyCtrl'
	    }
	  }    
    })
    
    .state('menu.logout', {
	    url:"/logout",
	    views: {
	    'menuContent': {
	    	templateUrl: 'templates/menu/logout.html',
	    	controller: 'LogOutCtrl'
	    }
	  }    
    })
    
    
    
;
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/sign-in');
  $urlRouterProvider.otherwise('/menu/tab/eventslist');

});

