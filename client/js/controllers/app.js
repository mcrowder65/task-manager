
const MILLISECONDS_IN_DAY = 86400000;

function appController($scope, $http, $mdToast) {

  $scope.$on('callIsLoggedIn', () => {
    $scope.isLoggedIn();
  })

  $scope.isLoggedIn = () => {
    $scope.loggedIn = !!localStorage.token;
  }

  $scope.logout = () => {
    localStorage.token = '';
    $scope.isLoggedIn();
  }

  $scope.reroute = (url) => {
    window.location = url;
  }

  $scope.editReminder = (_id) => {
    window.location.href = "/#!/addReminder/?_id=" + _id;
  }

  $scope.openToast = ($event) => {
    $mdToast.showSimple($event);
  };

}
const appConfig = ($routeProvider) => {

  $routeProvider
    .when('/#!', {
      controller: 'app',
      templateUrl: 'client/html/allReminders.html'
    })
    .when('/allReminders', {
      controller: 'app',
      templateUrl: 'client/html/allReminders.html'
    })
    .when('/addReminder', {
      controller: 'app',
      templateUrl: 'client/html/addReminder.html'
    })
    .when('/profile', {
      controller: 'app',
      templateUrl: 'client/html/profile.html'
    })
    .when('/signup', {
      controller: 'app',
      templateUrl: 'client/html/signup.html'
    })
    .when('/login', {
      controller: 'app',
      templateUrl: 'client/html/login.html'
    })
    .when('/logout', {
      controller: 'app',
      templateUrl: 'client/html/logout.html'
    })
    .otherwise({
      redirectTo: '/allReminders'
    });

}
angular.module('app', ['ngRoute', 'ngMaterial', 'userService', 'reminderService']).controller('app', appController, ReminderService).config(appConfig);
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
