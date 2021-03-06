
function appController($scope, $http, $mdToast) {

  $scope.$on('callIsLoggedIn', () => {
    $scope.isLoggedIn();
  })

  $scope.isLoggedIn = () => {
    $scope.loggedIn = !!localStorage.token;
    
    return $scope.loggedIn;
  }

  $scope.logout = () => {
    localStorage.token = '';
    $scope.isLoggedIn();
  }

  $scope.reroute = (url) => {
    window.location = url;
  }

  $scope.editReminder = (_id) => {
    $scope.reroute('/#!/addReminder/?_id=' + _id);
  }

  $scope.openToast = ($event) => {
    $mdToast.showSimple($event);
  };

}
const appConfig = ($routeProvider) => {

  $routeProvider
    .when('/#!', {
      controller: 'app',
      templateUrl: 'client/html/addReminder.html'
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
      redirectTo: '/addReminder'
    });

}

const factory = ($rootScope) => {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    }
  };
}
angular.module('app', ['ngRoute', 'ngMaterial', 'userService', 'reminderService', 'utilitiesService']).factory('socket', ['$rootScope', factory]).controller('app', appController, ReminderService).config(appConfig);
