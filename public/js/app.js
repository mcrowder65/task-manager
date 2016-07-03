
var app = angular.module('app', ['ngRoute']);

app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('SimpleController', function ($scope, simpleFactory) {
    
    //Used in addReminder and Profile controller
    $scope.getSenderPassword = function() {
        $scope.senderPassword = getSenderPassword();
    }
    
    //Used in addReminder and Profile controller
    $scope.getSenderEmail = function() {
        $scope.senderEmail = getSenderEmail();
    }

    //Used in addReminder and profile controller
    $scope.getReceiverEmail = function() {
        $scope.receiverEmail = getReceiverEmail();
    }
    
});

app.config(function ($routeProvider) {

	$routeProvider
    .when('/#',
    {
        controller: 'SimpleController',
        templateUrl: 'public/html/allReminders.html'
    })
    .when('/allReminders',	
    {
		controller: 'SimpleController',
        templateUrl: 'public/html/allReminders.html'
    })
    .when('/day',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/day.html'
    })
    .when('/week',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/week.html'
    })
    .when('/month',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/month.html'
    })
    .when('/addReminder',
    {
    	controller: 'SimpleController',
    	templateUrl: 'public/html/addReminder.html'
    })
    .when('/profile',
    {
    	controller: 'SimpleController',
    	templateUrl: 'public/html/profile.html'
    })
    .when('/signup',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/signup.html'
    })
    .when('/login',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/login.html'
    })
    .when('/logout',
    {
        controller: 'SimpleController',
        templateUrl: 'public/html/logout.html'
    })
    .otherwise({ redirectTo: '/allReminders' });

});
/*******************************************************************************************************************/
                                                //BASIC FUNCTIONS
/*******************************************************************************************************************/


function get(parameter) {  
  var url = window.location.href;
  var index = url.indexOf(parameter);
  if(index == -1)
    return null;
  index += parameter.length + 1; //if the word we're looking for is address, get a index
                                 //then add address.length +1 to get start of value 
   
  var i = index;
  while(url[i] != '?' && url[i] != '&') {
    if(i > url.length)
      break;
    i++;
  }
  return url.substring(index, i);
} 

/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/

function getReceiverEmail(){
    var receiverEmail = '';
    $.ajax
    ({
        url: "/getReceiverEmail",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            receiverEmail = data.email;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return receiverEmail;
}

function getSenderEmail(){
    var senderEmail = '';
    $.ajax
    ({
        url: "/getSenderEmail",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            senderEmail = data.senderEmail;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return senderEmail;
}

function getSenderPassword() {
    var senderPassword = '';
    $.ajax
    ({
        url: "/getSenderPassword",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            senderPassword = data.senderPassword;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return senderPassword;
}


















