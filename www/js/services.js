angular.module('starter.services', [])



.factory('MyEvents', function($http) {
  // Might use a resource here that returns a JSON array


  var private_my_events = null;
  
  
  return {
    all: function() {
      return private_my_events;
    },
    
    get: function(userId) {
    
    var _u = Parse.User.current();
	var _st = _u._sessionToken;
     
    return $http.get('https://api.parse.com/1/users/' + _u.id,
           	 {
	        	 headers:{
                    'X-Parse-Application-Id': 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key': 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                    'X-Parse-Session-Token' : _st,
                    'Content-Type' : 'application/json'
                },               
                params: {include: "events_attending,events_created,events_maybe",
                		order: "-createdAt" }
                
              }).success( function(response) { private_my_events = response; })
     
     },     
     
       
     updateEventStatus : function(data, event_category, status) {
          
     var _u = Parse.User.current();
	 var _st = _u._sessionToken;
     
     	var _uu = {};
     	
     	for(var a = 0 ; a < event_category.length ; a++) {
 			_uu[event_category[a]] = {"__op":status[a],"objects":[{"__type":"Pointer","className":"events","objectId":data.objectId}]};
 		}
	     	     
	     return $http.put('https://api.parse.com/1/users/' + _u.id,
                _uu,
                {headers:{
                    'X-Parse-Application-Id' : 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key' : 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                    'X-Parse-Session-Token' : _st,
                 	'Content-Type' : 'application/json'
                }
			}).success(function(data) {
			
				console.log("updateStatsEvent");
			
			
			}).error(function(data, status, headers, config) {
				
				
			});
	     
     }
     
     
  }
})

.factory('Events',['$http','PARSE_CREDENTIALS',function($http,PARSE_CREDENTIALS){

	
	var private_ev;
	var private_type = {};
	//var private_ev_detail = {title:"ASSHOLE"};
	
	var detail = {title:"", mode:"", location:""};
	
    return {
    
    	getEventData : function() { return private_ev },
    	
    	getTypeData: function() { return private_type },
    	
        getAll:function(){
            return $http.get('https://api.parse.com/1/classes/events',{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                },
                params: {order: "-createdAt"}
            }).then( function(response) { 		
	 				console.log(response);
	 				private_ev = response.data.results;	 			
	 				console.log(private_ev);
	 				return private_ev;	 
	 			});
        },
        get:function(id){
            return $http.get('https://api.parse.com/1/classes/events/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                }
            });
        },
        
        getType:function(type, subtype) {
        
        var _q = {};
        _q[type] = subtype;
        private_type.type = type; 
        private_type.subtype = subtype;
        console.log(private_type);

	      	return $http.get('https://api.parse.com/1/classes/events',
     
	        	 {
	        	 headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                   	'Content-Type' : 'application/json'
                },
                 params: {where : _q,
                 		  order : "-createdAt",
                 		  include: "users_attending,users_maybe",
                 		 limit:100} 
              }).then( function(response) { 		
	 				console.log(response);
	 				private_ev = response.data.results;	 			
	 				console.log(private_ev);
	 				return private_ev;	 
	 			});
		}, 
		
		setEventDetail : function(obj) {
			
			console.log("DETAIL BEFORE");
			console.log(detail);
			
			for(var a in obj) {
				detail[a] = obj[a];
			}
			
			console.log(detail);
			//var nd = new Date(obj.date_start + "," + obj.time_start);
			//var _do = {"__type":"Date", "iso":nd};
			//console.log(nd);
			//detail.start_date_obj = _do;
			
			
		},   
		
		getEventDetail : function() {
			
			return detail;
			
		},   
		
		detail : detail,   
		
		
		updateAttendStatus : function(data, event_category, status) {
          
     var _u = Parse.User.current();
	 var _st = _u._sessionToken;
     
     	var _uu = {};
     	
     	for(var a = 0 ; a < event_category.length ; a++) {
 			_uu[event_category[a]] = {"__op":status[a],"objects":[{"__type":"Pointer","className":"_User","objectId":_u.id}]};
 		}
	     	     
	     return $http.put('https://api.parse.com/1/classes/events/' + data.objectId,
                _uu,
                {headers:{
                    'X-Parse-Application-Id' : 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key' : 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                 	'Content-Type' : 'application/json'
                }
			}).success(function(data) {
			
				console.log("updateStatsEvent");
			
			
			}).error(function(data, status, headers, config) {
				
				
			});
	     
     },
	        
        create:function(data){
        	console.log("HELLO");
            return $http.post('https://api.parse.com/1/classes/events',data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        
        edit:function(id,data){
            return $http.put('https://api.parse.com/1/classes/events/'+id,data,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        },
        
        delete:function(id){
            return $http.delete('https://api.parse.com/1/classes/events/'+id,{
                headers:{
                    'X-Parse-Application-Id': PARSE_CREDENTIALS.APP_ID,
                    'X-Parse-REST-API-Key':PARSE_CREDENTIALS.REST_API_KEY,
                    'Content-Type':'application/json'
                }
            });
        }
    }
}]).value('PARSE_CREDENTIALS',{
    APP_ID: 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
    REST_API_KEY:'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4'
})


//FUTURE VERSION SHOULD NOT INCLUDE EVENTS ATTENDING/EVENTS MAYBE AND LOAD WHEN PEEPS-EVENTS IS PULLED UP
.factory('Peeps', function($http) {

	var current_peep = {};
  
  return {
    
    get: function() {
        
    return $http.get('https://api.parse.com/1/users/',
           	 {
	        	 headers:{
                    'X-Parse-Application-Id': 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key': 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                    'Content-Type' : 'application/json'
                },               
                params: {include: "events_attending,events_maybe"}
                
              }).success( function(response) { console.log(response) })
     
     },     
       
     setCurrentPeep : function(obj) {
	     
	    current_peep = obj; 
	     
     },
     
     getCurrentPeep : function() {
	     
	     return current_peep;
	     
     }
     
  }
})

.factory('Profile', function($http) {

  var profile = null;
  
  
  return {
   
    
    get: function() {
    
    var _u = Parse.User.current();
	var _st = _u._sessionToken;
     
    return $http.get('https://api.parse.com/1/users/' + _u.id,
           	 {
	        	 headers:{
                    'X-Parse-Application-Id': 'jXSIMBK3P0LkAIuF6wmK689RQgiVLL95BJxy8yUA',
                    'X-Parse-REST-API-Key': 'bTybWcAUFGwFl8SXqnooWJdQJpK0h3u7WHUuf5h4',
                    'X-Parse-Session-Token' : _st,
                    'Content-Type' : 'application/json'
                }
                /*,               
                params: {include: "events_attending,events_created,events_maybe",
                		order: "-createdAt" }
                */
              }).success( function(response) { profile = response; })
     
     }         
  }
})

.factory('Shared', function($http) {

  var shared = {description:"Enter Address"};
    
  return {   
    
    get: function() {
    
		return shared;
     
     },
     
     shared: shared,
     
     set: function(val) {
	     
	     for(var a in val) {
	     	shared[a] = val[a];
	     }
	     
	     console.log("SHARED SERVICE");
	     console.log(shared);
	     
     }
     
        
  }
})


;