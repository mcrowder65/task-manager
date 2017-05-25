var app= angular.module('app');
app.controller('profile', ['$scope', '$http', ($scope, $http) => {
  $scope.init = async () => {
    try {
      const user = await $scope.getById();
      $scope.receiverEmail = user ? user.receiverEmail : $scope.receiverEmail;
      $scope.senderEmail = user ? user.senderEmail : $scope.senderEmail;
      $scope.senderPassword = user ? user.senderPassword : $scope.senderPassword;
      $scope.$apply();
    } catch(error) {
      console.error(error);
    }
  };

  $scope.updateUser = async () => {
    try {
      let user = await $scope.getById();
      user.receiverEmail = $scope.receiverEmail;
      user.senderEmail = $scope.senderEmail;
      user.senderPassword = $scope.senderPassword;
      const response = await $http({
        method: 'POST',
        url: '/setById',
        data: {
          token: localStorage.token,
          user
        }
      });
      $scope.openToast('Profile set');
    } catch(error) {
      console.error(error);
      $scope.openToast('Something went wrong...');
    }
  };

}]);
