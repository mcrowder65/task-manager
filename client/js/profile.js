var app= angular.module('app');
app.controller('profile', ['$scope', '$http', ($scope, $http) => {
  $scope.init = async () => {
    const user = await $scope.getById();
    $scope.receiverEmail = user.receiverEmail;
    $scope.senderEmail = user.senderEmail;
    $scope.senderPassword = user.senderPassword;
  }
  $scope.setSenderPassword = () => {
      $http({
          method: 'POST',
          url: '/setSenderPassword',
          data: { _id:localStorage.token, senderPassword: $scope.senderPassword }
      }).then(successCallback = (response) => {
      }, errorCallback = (response) => {
          alert("setSenderPassword busted!");
          throw new Error("setSenderPassword busted!");
      });
  }

  $scope.setSenderEmail = () => {
      $http({
          method: 'POST',
          url: '/setSenderEmail',
          data: {_id: localStorage.token, senderEmail: $scope.senderEmail}
      }).then(successCallback = (response) => {
      }, errorCallback = (response) => {
          alert("setSenderEmail busted!");
          throw new Error("setSenderEmail busted!");
      });
  }

  $scope.setReceiverEmail = () => {
      $http({
          method: 'POST',
          url: '/setReceiverEmail',
          data: {_id: localStorage.token, receiverEmail: $scope.receiverEmail}
      }).then(successCallback = (response) =>{
      }, errorCallback = (response) =>{
          throw new Error("setReceiverEmail busted!");
      });
  }

}]);
