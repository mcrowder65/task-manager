var app= angular.module('app');
app.controller('signup', ['$scope', '$http', ($scope, $http) => {

    $scope.signUp = () => {
      try {
        $scope.username = $scope.username.toLowerCase();
        var username = $scope.username;
        var password = $scope.password;
        $http({
            method: 'POST',
            url: '/signup',
            data: {username, password}
        }).then(successCallback = (response) => {
            localStorage.token = response.data.token;
            window.location="/index.html";
        }, errorCallback = (response) => {
            $scope.openToast('something went wrong!');
            localStorage.token="";
            throw new Error("signup busted!");
        });
      } catch(error) {
        $scope.openToast('something went wrong!');
      }

    }
}]);
