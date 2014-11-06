Parse.initialize("jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA", "Pge7WSHTkSVAa6kv6APQM9s39R07Cx2IXqW3BZJa"); 

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services','angularFileUpload','ngCordova'])

.run(function($ionicPlatform, $rootScope, $ionicModal, $ionicPopover, $cordovaStatusbar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      $cordovaStatusar.styleHex('#34a8c8');
      
    }
    
    $ionicModal.fromTemplateUrl('templates/events-create.html', {
	    scope: $rootScope
	}).then(function(modal) {
	    $rootScope.modal = modal;
	});
	
	 $ionicPopover.fromTemplateUrl('my-popover.html', {
	    scope: $rootScope,
	  }).then(function(popover) {
	    $rootScope.popover = popover;
	    
	  });
       
  });  
  
})

.config(function($stateProvider, $urlRouterProvider) {

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
          controller: 'EventsListCtrl',
	  		params: ['type','subtype']
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
    
    .state('menu.tab.faces_events', {
      url: '/faces_events',
      views: {
        'tab-faces': {
          templateUrl: 'templates/peep-events.html',
          controller: 'PeepEventCtrl'
        }
      }
    })

	.state('menu.tab.faces_events_detail', {
      url: '/faces_events_detail',
      views: {
        'tab-faces': {
          templateUrl: 'templates/event-detail.html',
          controller: 'EventDetailCtrl'
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
    
    .state('menu.tab.events_view', {
     // url: '/events_view',
      views: {
      	'tab-eventslist': 
	 	//'menuContent': 
	 	{
	 		templateUrl: 'templates/events-view.html',	  		
	  		controller: 'EventsViewCtrl'
	  		
	  	}
	  }
    })
    /*
     .state('menu.events_view', {
      url: '/events_view/',//:type/:subtype',
      views: {
	 	'menuContent': {
	 		templateUrl: 'templates/events-view.html',
	  		controller: 'EventsViewCtrl'
	  	}
	  }
    })*/
    
    .state('menu.tab.event_detail', {
      url: '/event_detail',//:id',
      views: {
	 	'tab-eventslist': {
	 		templateUrl: 'templates/event-detail.html',
	  		controller: 'EventDetailCtrl'
	  		
	  	}
	  }
    }) 
    /*
    .state('menu.event_detail', {
      url: '/event_detail/:id',
      views: {
	 	'menuContent': {
	 		templateUrl: 'templates/event-detail.html',
	  		controller: 'EventDetailCtrl'
	  	}
	  }
    }) */
    
    
    //MENU OPTIONS

    
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
  $urlRouterProvider.otherwise('/sign-in');
  //$urlRouterProvider.otherwise('/menu/tab/eventslist');

});

