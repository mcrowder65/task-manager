var app= angular.module('app');
app.controller('profile', ['$scope', '$http', function ($scope, $http) {

    $scope.setSenderPassword = function() {
        $http({
            method: 'POST',
            url: '/setSenderPassword',
            data: { _id:localStorage.token, senderPassword: $scope.senderPassword }
        }).then(function successCallback(response) {
        }, function errorCallback(response) {
            alert("setSenderPassword busted!");
            throw new Error("setSenderPassword busted!");
        });
    }

    $scope.setSenderEmail = function() {
        $http({
            method: 'POST',
            url: '/setSenderEmail',
            data: {_id: localStorage.token, senderEmail: $scope.senderEmail}
        }).then(function successCallback(response) {
        }, function errorCallback(response) {
            alert("setSenderEmail busted!");
            throw new Error("setSenderEmail busted!");
        });
    }

    $scope.setReceiverEmail = function(){
        $http({
            method: 'POST',
            url: '/setReceiverEmail',
            data: {_id: localStorage.token, receiverEmail: $scope.receiverEmail}
        }).then(function successCallback(response) {
        }, function errorCallback(response) {
            throw new Error("setReceiverEmail busted!");
        });
    }

}]);
