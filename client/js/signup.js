var app= angular.module('app');
app.controller('signup', ['$scope', function ($scope) {

    $scope.signUp = function() {
        signUpUser($scope.username, $scope.confirmPassword);
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
/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/

function signUpUser(username, password){
    username = username.toLowerCase();
    $.ajax
    ({
        url: "/signup",
        dataType: 'json',
        type: 'POST',
        data: {username: username, password: password},
        success: function(data, status, headers, config){
            localStorage.token = data.token;
            window.location="/index.html";
        }.bind(this),
        error: function(data, status, headers, config){
            localStorage.token="";
        }.bind(this)
    });
}