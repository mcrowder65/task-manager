   

var app = angular.module('app', ['ngRoute']);

app.factory('simpleFactory', function(){
	var factory = {};
    factory.sendEmail = function($scope) {
        sendEmailToServer({
            sendingEmail: $scope.sendingEmail,
            sendingPassword: $scope.sendingPassword,
            receivingEmail: $scope.receivingEmail,
            timeToSend: $scope.timeToSend,
            emailBody: $scope.emailBody
        });
    }

	return factory;
});
app.controller('SimpleController', function ($scope, simpleFactory) {
    $scope.sendEmail = function() {
        simpleFactory.sendEmail($scope);
    }
    $scope.signUp = function() {
        signUpUser($scope.username, $scope.confirmPassword);
    }
    $scope.login = function() {
        login($scope.username, $scope.password);
    }
    $scope.verifyPasswords = function() {
        verifyPasswords($scope.initialPassword, $scope.confirmPassword);
    }
});

app.config(function ($routeProvider) {

	$routeProvider
    .when('/#',
    {
        controller: 'SimpleController',
        templateUrl: 'public/html/allEmails.html'
    })
    .when('/allEmails',	
    {
		controller: 'SimpleController',
        templateUrl: 'public/html/allEmails.html'
    })
    .when('/day',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/day.html'
    })
    .when('/week',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/week.html'
    })
    .when('/month',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/month.html'
    })
    .when('/addEmail',
    {
    	controller: 'SimpleController',
    	templateUrl: 'public/html/addEmail.html'
    })
    .when('/profile',
    {
    	controller: 'SimpleController',
    	templateUrl: 'public/html/profile.html'
    })
    .when('/signup',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/signup.html'
    })
    .when('/login',
    {
    	controller: 'SimpleController',
        templateUrl: 'public/html/login.html'
    })
    .when('/logout',
    {
        controller: 'SimpleController',
        templateUrl: 'public/html/logout.html'
    })
    .otherwise({ redirectTo: '/allEmails' });

});
function changePasswordBoxColor(color){
    document.getElementById("initialPassword").style.borderColor=color;
    document.getElementById("confirmPassword").style.borderColor=color;
}
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
function sendEmailToServer(data){
    $.ajax
    ({
        url: "/newEmail",
        dataType: 'json',
        type: 'POST',
        data: data,
        success: function(data, status, headers, config){
          console.log("success");
        }.bind(this),
        error: function(data, status, headers, config){
            console.log("error");
        }.bind(this)
    });
}
function signUpUser(username, password){
    $.ajax
    ({
        url: "/signup",
        dataType: 'json',
        type: 'POST',
        data: {username: username, password: password},
        success: function(data, status, headers, config){
            localStorage.token = data.token;
        }.bind(this),
        error: function(data, status, headers, config){
            localStorage.token="";
        }.bind(this)
    });
}
function login(username, password){
    $.ajax
    ({
        url: "/login",
        dataType: 'json',
        type: 'POST',
        data: {username: username, password: password},
        success: function(data, status, headers, config){
            localStorage.token = data.token;
        }.bind(this),
        error: function(data, status, headers, config){
            localStorage.token="";
        }.bind(this)
    });
}





















