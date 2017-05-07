
var app = angular.module('app', ['ngRoute', 'ngMaterial']);
var MILLISECONDS_IN_DAY = 86400000;
app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('app', function ($scope, simpleFactory, $http) {

    $scope.getSenderPassword = function() {
        $http({
          method: 'POST',
          url: '/getSenderPassword',
          data: { id:localStorage.token }
        }).then(function successCallback(response) {
            $scope.senderPassword = response.data.senderPassword;
        }, function errorCallback(response) {
            alert("Retrieving sender password broke!");
            throw new Error("Retrieving sender password broke!");
        });
    }

    //Used in addReminder and profile controller
    $scope.getSenderEmail = function() {
        $http({
            method: 'POST',
            url: '/getSenderEmail',
            data: {id:localStorage.token }
        }).then(function successCallback(response) {
            $scope.senderEmail = response.data.senderEmail;
        }, function errorCallback(response) {
            alert("getSenderEmail busted!");
            throw new Error("getSenderEmail busted!");
        });
    }

    //Used in addReminder and profile controller
    $scope.getReceiverEmail = function() {
        $http({
            method: 'POST',
            url: '/getReceiverEmail',
            data: {id:localStorage.token }
        }).then(function successCallback(response) {
            $scope.receiverEmail = response.data.email;
        }, function errorCallback(response) {
            alert("getReceiverEmail busted!");
            throw new Error("getReceiverEmail busted!");
        });
    }
    $scope.isLoggedIn = function() {
        $scope.loggedIn = localStorage.token != null && localStorage.token != "";
    }

    $scope.getReminders = function(ids) {
        $http({
            method: 'POST',
            url: '/getReminders',
            data: { id: localStorage.token }
        }).then(function successCallback(response) {
            var reminders = response.data;
            for(var i = 0; i < reminders.length; i++) {
                var date = new Date(reminders[i].timeToSend)
                reminders[i].date = (date.getMonth() + 1) + "/" + date.getDate()  + " " + date.toLocaleTimeString();
            }
            if(ids) {

              for(var i = 0; i < reminders.length; i++) {
                if(ids.indexOf(reminders[i]._id) > -1) {
                  reminders[i].hidden = true;
                }
              }
            }
            $scope.reminders = reminders;
        }, function errorCallback(response) {
            alert("getReminders busted!");
            throw new Error("getReminders busted!");
        });
    }

    $scope.editReminder = function(_id){
        window.location.href = "/#/addReminder/?_id=" + _id;
    }
    $scope.deleteReminder = function(_id) {
        $http({
            method: 'POST',
            url: '/deleteReminder',
            data: { _id: _id }
        }).then(function successCallback(response) {
            $scope.getReminders();
        }, function errorCallback(response) {
            alert("deleteReminder busted!");
            throw new Error("deleteReminder busted!");
        });
    }
    $scope.sendReminderImmediately = function(_id) {
        $http({
            method: 'POST',
            url: '/sendReminderImmediately',
            data: { _id: _id }
        }).then(function successCallback(response) {
            $scope.getReminders();
        }, function errorCallback(response) {

            alert("sendReminderImmediately busted!!!");
            throw new Error("sendReminderImmediately busted!!!");
        });
    }
    $scope.hide = function(reminder) {
        reminder.hidden = true;
    }
});

app.config(function ($routeProvider) {

	$routeProvider
    .when('/#!',
    {
        controller: 'app',
        templateUrl: 'client/html/allReminders.html'
    })
    .when('/allReminders',
    {
	    controller: 'app',
      templateUrl: 'client/html/allReminders.html'
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

function indexOf(scopeReminders, reminders) {
  for(var i = 0; i < scopeReminders.length; i++) {
    if(scopeReminders[i].id === reminders[i].id) {
      return i;
    }
  }
  return -1;
}
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

function removeGet(parameter, dateToSend) {
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
  window.location.href = String(window.location.href).replace(url.substring(index, i), "") + 'date=' + dateToSend;
}
