var app= angular.module('app');
app.controller('login', ['$scope', '$http', ($scope, $http) => {

    $scope.login = () => {
        var username = $scope.username;
        var password = $scope.password;
        $http({
            method: 'POST',
            url: '/login',
            data: { username, password }
        }).then(successCallback = (response) => {
            localStorage.token = response.data.token;
            window.location="/index.html";
        }, errorCallback = (response) => {
            $scope.openToast("Login failed");
            throw new Error("Login busted!!!");
        });
    }

}]);
