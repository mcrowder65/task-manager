function profileController($scope, $http, UserService) {
  $scope.init = async() => {
    try {
      if(!$scope.isLoggedIn()) {
        $scope.openToast('You must be logged in to see this page');
        $scope.reroute('/#!/login');
        return;
      }
      const user = await UserService.getLoggedInUser();
      $scope.username = user ? user.username : $scope.username;
      $scope.receiverEmail = user ? user.receiverEmail : $scope.receiverEmail;
      $scope.senderEmail = user ? user.senderEmail : $scope.senderEmail;
      $scope.senderPassword = user ? user.senderPassword : $scope.senderPassword;
      $scope.$apply();
    } catch(error) {
      console.error(error);
    }
  };

  $scope.updateUser = async() => {
    try {
      let user = await UserService.getLoggedInUser();
      user.receiverEmail = $scope.receiverEmail;
      user.senderEmail = $scope.senderEmail;
      user.senderPassword = $scope.senderPassword;
      await UserService.update(user);
      $scope.openToast('Profile set');
    } catch(error) {
      console.error(error);
      $scope.openToast('Something went wrong...');
    }
  };

  const serverSocket = io(window.location.hostname + ':' + (window.location.hostname === 'localhost' ? '3000' : '80'));

  serverSocket.on('profile-updated', async () => {
    try {
      $scope.init();
    } catch(error) {
      console.error(error);
    }
  });

}

angular.module('app').controller('profile', ['$scope', '$http', 'UserService', profileController]);
