function loginController($scope, $http, UserService) {
  $scope.login = async() => {
    try {
      const token = await UserService.login($scope.username.toLowerCase(), $scope.password);
      localStorage.token = token;
      $scope.$emit('callIsLoggedIn', {});
      window.location = "/#!/addReminder";
    } catch(error) {
      console.error('error while logging in ', error);
      $scope.openToast('Login failed');
    }
  }

}
angular.module('app').controller('login', ['$scope', '$http', 'UserService', loginController]);
