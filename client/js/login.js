var app= angular.module('app');
app.controller('login', ['$scope', '$http', ($scope, $http) => {

    $scope.login = async () => {
      try {
        const username = $scope.username;
        const password = $scope.password;
        const response = await $http({
          method: 'POST',
          url: '/login',
          data: {
            username,
            password
          }
        });
        localStorage.token = response.data;
        window.location="/#!/allReminders";

      } catch(error) {
        console.error('error while logging in ', error);
        console.error('response ', response);
        $scope.openToast('Login failed');
      }
    }

}]);
