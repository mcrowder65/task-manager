var app= angular.module('app');
app.controller('login', ['$scope', function ($scope) {

    $scope.login = function() {
        login($scope.username, $scope.password);
    }
    
}]);

/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/

function login(username, password) {
    username = username.toLowerCase();
    $.ajax
    ({
        url: "/login",
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

