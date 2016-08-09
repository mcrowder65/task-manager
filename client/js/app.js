
var app = angular.module('app', ['ngRoute']);
var MILLISECONDS_IN_DAY = 86400000;
app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('app', function ($scope, simpleFactory) {
    
    //Used in addReminder and profile controller
    $scope.getSenderPassword = function() {
        $scope.senderPassword = getSenderPassword();
    }
    
    //Used in addReminder and profile controller
    $scope.getSenderEmail = function() {
        $scope.senderEmail = getSenderEmail();
    }

    //Used in addReminder and profile controller
    $scope.getReceiverEmail = function() {
        $scope.receiverEmail = getReceiverEmail();
    }
    $scope.isLoggedIn = function() {
        $scope.loggedIn = localStorage.token != null && localStorage.token != "";
    }

    $scope.getReminders = function(){
        $scope.reminders = getReminders();
    }
    $scope.editReminder = function(_id){
        window.location.href = "/#/addReminder/?_id=" + _id;
    }
    $scope.deleteReminder = function(_id) {
        if(deleteReminder(_id)) {
            $scope.reminders = getReminders();
        }
    }
    $scope.sendReminderImmediately = function(_id) {
        if(sendReminderImmediately(_id)){
            $scope.reminders = getReminders();
        }
    }
});

app.config(function ($routeProvider) {

	$routeProvider
    .when('/#',
    {
        controller: 'app',
        templateUrl: 'client/html/allReminders.html'
    })
    .when('/allReminders',	
    {
		controller: 'app',
        templateUrl: 'client/html/allReminders.html'
    })
    .when('/day',
    {
    	controller: 'app',
        templateUrl: 'client/html/day.html'
    })
    .when('/week',
    {
    	controller: 'app',
        templateUrl: 'client/html/week.html'
    })
    .when('/month',
    {
    	controller: 'app',
        templateUrl: 'client/html/month.html'
    })
    .when('/addReminder',
    {
    	controller: 'app',
    	templateUrl: 'client/html/addReminder.html'
    })
    .when('/profile',
    {
    	controller: 'app',
    	templateUrl: 'client/html/profile.html'
    })
    .when('/signup',
    {
    	controller: 'app',
        templateUrl: 'client/html/signup.html'
    })
    .when('/login',
    {
    	controller: 'app',
        templateUrl: 'client/html/login.html'
    })
    .when('/logout',
    {
        controller: 'app',
        templateUrl: 'client/html/logout.html'
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

function removeGet(parameter) {
  var url = window.location.href;
  var index = url.indexOf(parameter);
  if(index == -1)
    return null;
   
  var i = index + parameter.length + 1;
  while(url[i] != '?' && url[i] != '&') {
    if(i > url.length)
      break;
    i++;
  }
  window.location.href = String(window.location.href).replace(url.substring(index, i), "");
}
/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/
function deleteReminder(_id) {
    var success = false;
    $.ajax
    ({
        url: "/deleteReminder",
        dataType: "json",
        type: "POST",
        async: false,
        data: {_id: _id},
        success: function(data, status, headers, config){
            success = true;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return success;
}
function sendReminderImmediately(_id) {
    var success = false;
    $.ajax
    ({
        url: "/sendReminderImmediately",
        dataType: "json",
        type: "POST",
        async: false,
        data: {_id: _id},
        success: function(data, status, headers, config){
            success = true;
        }.bind(this),
        error: function(data, status, headers, config){

        }.bind(this)
    });
    return success;
}
function getReminders() {
    var reminders = [];
    $.ajax
    ({
        url: "/getReminders",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            reminders = data;
            for(var i = 0; i < reminders.length; i++) {
                var date = new Date(reminders[i].timeToSend)
                reminders[i].date = (date.getMonth() + 1) + "/" + date.getDate()  + " " + date.toLocaleTimeString()
            }
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return reminders;
}
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


















