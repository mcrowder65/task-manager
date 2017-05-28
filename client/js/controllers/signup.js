function signupController($scope, $http, UserService) {

  $scope.signUp = async() => {
    try {
      const token = await UserService.signup($scope.username.toLowerCase(), $scope.password);
      localStorage.token = token;
      $scope.$emit('callIsLoggedIn', {});
      $scope.reroute('/#!/addReminder');
    } catch(error) {
      console.error('something went wrong while signing up ', error);
      if(error.data === 'username taken') {
        $scope.openToast('Username taken');
      } else if(error.data === 'empty password') {
        $scope.openToast('Your password can\'t be empty!');
      } else {
        $scope.openToast('something went wrong!');
      }
    }
  }
}
angular.module('app').controller('signup', ['$scope', '$http', 'UserService', signupController]);
