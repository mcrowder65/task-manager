
var app = angular.module('app', ['ngRoute', 'ngMaterial']);
var MILLISECONDS_IN_DAY = 86400000;
app.factory('simpleFactory', () => {
    var factory = {};

    return factory;
});

app.controller('app', function ($scope, simpleFactory, $http, $mdToast) {

    $scope.isLoggedIn = () => {
        $scope.loggedIn = !!localStorage.token;
    }

    $scope.logout = () => {
      localStorage.token = '';
    }

    $scope.reroute = (url) => {
      window.location = url;
    }

    $scope.getReminders = async () => {
      const response = await $http({
        method: 'POST',
        url: '/getReminders',
        data: {
          id: localStorage.token
        }
      });

      return response.data.map( (reminder) => {
        const date = new Date(reminder.timeToSend)
        reminder.date = (date.getMonth() + 1) + "/" + date.getDate()  + " " + date.toLocaleTimeString()
        return reminder;
      });

    }

    $scope.getRemindersByDay = async (date) => {
      const response = await $http({
        method: 'POST',
        url: '/getRemindersByDay',
        data: {
          currentDay: date || new Date(),
          id: localStorage.token // TODO move this to be a jwt or something which contains the uid?
        }
      });
      return response.data.map( (reminder) => {
        const date = new Date(reminder.timeToSend)
        reminder.date = (date.getMonth() + 1) + "/" + date.getDate()  + " " + date.toLocaleTimeString()
        // TODO change to object spread when it becomes available
        return reminder;
      });

    }

    $scope.editReminder = (_id) => {
        window.location.href = "/#!/addReminder/?_id=" + _id;
    }

    $scope.deleteReminder = async (_id) => {
      await $http({
          method: 'POST',
          url: '/deleteReminder',
          data: {
            _id
          }
      });
    }
    $scope.sendReminderImmediately = async (_id) => {
      await $http({
        method: 'POST',
        url: '/sendReminderImmediately',
        data: {
          _id
        }
      });
      $scope.reminders = await $scope.getReminders(); //TODO change to get by day or get all
      $scope.$apply();
    }

    $scope.getById = async () => {
      const response = await $http({
        method: 'POST',
        url: '/getByUserId',
        data: {
          _id: localStorage.token // TODO move to jwt
        }
      });
      return response.data;
    }

    $scope.hide = (reminder) => {
        reminder.hidden = true;
    }

    $scope.openToast = ($event) => {
      $mdToast.showSimple($event);
    };

});

app.config( ($routeProvider) => {

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

const indexOf = (scopeReminders, reminders) => {
  for(var i = 0; i < scopeReminders.length; i++) {
    if(scopeReminders[i].id === reminders[i].id) {
      return i;
    }
  }
  return -1;
}
const get = (parameter) => {
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

const removeGet = (parameter, dateToSend) => {
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
