var app = angular.module('app');
app.controller('login', ['$scope', '$http', '$rootScope', ($scope, $http, $rootScope) => {

  $scope.login = async() => {
    try {
      const response = await $http({
        method: 'POST',
        url: '/login',
        data: {
          username: $scope.username,
          password: $scope.password
        }
      });
      localStorage.token = response.data;
      $scope.$emit('callIsLoggedIn', {});
      window.location = "/#!/allReminders";
    } catch (error) {
      console.error('error while logging in ', error);
      $scope.openToast('Login failed');
    }
  }

}]);
