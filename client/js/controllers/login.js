function loginController($scope, $http, UserService) {
  $scope.login = async() => {
    try {
      const token = await UserService.login($scope.username.toLowerCase().trim(), $scope.password);
      localStorage.token = token;
      $scope.$emit('callIsLoggedIn', {});
      $scope.reroute('/#!/addReminder');
    } catch(error) {
      console.error('error while logging in ', error);
      $scope.openToast('Login failed');
    }
  }

}
angular.module('app').controller('login', ['$scope', '$http', 'UserService', loginController]);
