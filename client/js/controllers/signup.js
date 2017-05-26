var app = angular.module('app');
app.controller('signup', ['$scope', '$http', ($scope, $http) => {

  $scope.signUp = async() => {
    try {
      $scope.username = $scope.username.toLowerCase();
      const response = await $http({
        method: 'POST',
        url: '/signup',
        data: {
          username: $scope.username,
          password: $scope.password
        }
      });

      localStorage.token = response.data;
      $scope.$emit('callIsLoggedIn', {});
      window.location = "/#!/allReminders";

    } catch(error) {
      $scope.openToast('something went wrong!');
    }

  }
}]);
