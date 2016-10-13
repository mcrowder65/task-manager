var app= angular.module('app');
app.controller('login', ['$scope', '$http', function ($scope, $http) {

    $scope.login = function() {
        var username = $scope.username;
        var password = $scope.password;
        $http({
            method: 'POST',
            url: '/login',
            data: { username: username, password: password }
        }).then(function successCallback(response) {
            localStorage.token = response.data.token;
            window.location="/index.html";
        }, function errorCallback(response) {
            throw new Error("Login busted!!!");
        });
    }
    
}]);

