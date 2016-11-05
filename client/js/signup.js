var app= angular.module('app');
app.controller('signup', ['$scope', '$http', function ($scope, $http) {

    $scope.signUp = function() {
        $scope.username = $scope.username.toLowerCase();
        var username = $scope.username;
        var password = $scope.confirmPassword;
        $http({
            method: 'POST',
            url: '/signup',
            data: {username: username, password: password}
        }).then(function successCallback(response) {
            localStorage.token = response.data.token;
            window.location="/index.html";
        }, function errorCallback(response) {
            localStorage.token="";
            alert("signup busted!");
            throw new Error("signup busted!");
        });
    }

    $scope.verifyPasswords = function() {
        verifyPasswords($scope.initialPassword, $scope.confirmPassword);
    }
}]);

/******************************************************************************************************************
											FUNCTIONS
******************************************************************************************************************/
function verifyPasswords(initialPassword, confirmPassword){
    if(initialPassword !== confirmPassword){
        changePasswordBoxColor("red");
    }
    else if(initialPassword === confirmPassword){
        changePasswordBoxColor("lime");
        if(confirmPassword.length < 7){
            changePasswordBoxColor("red");
        }
    }
}

function changePasswordBoxColor(color){
    $("#initialPassword").css("borderColor", color);
    $("#confirmPassword").css("borderColor", color);
}
