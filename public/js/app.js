
var app = angular.module('app', ['ngRoute']);

app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});
app.controller('SimpleController', function ($scope, simpleFactory) {
    $scope.sendEmail = function() {
        var time = String($scope.dateToSend);
        time = time.match("([Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]* [0-9]* [0-9]{0,4})");
        time = time[0];
        var timeToSend = new Date(time + " " + $scope.timeToSend).getTime();
        console.log(timeToSend);
        sendEmailToServer({
            sendingEmail: $scope.sendingEmail,
            sendingPassword: $scope.sendingPassword,
            receivingEmail: $scope.receivingEmail,
            timeToSend: timeToSend,
            emailBody: $scope.emailBody,
            subject: $scope.subject,
            userID: localStorage.token
        });
    }
    $scope.setReceiverEmail = function(){
        setReceiverEmail({_id: localStorage.token, receiverEmail: $scope.receiverEmail});
    }
    $scope.getReceiverEmail = function() {
        $scope.receiverEmail = getReceiverEmail();
        console.log($scope.receiverEmail);
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
function setReceiverEmail(data){
    $.ajax
    ({
        url: "/setReceiverEmail",
        dataType: 'json',
        type: 'POST',
        data: data,
        success: function(data, status, headers, config){
            console.log('set receiverEmail to ' + data);
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
}
var receiverEmail = '';
function getReceiverEmail(){
    
    $.ajax
    ({
        url: "/getReceivingEmail",
        dataType: 'json',
        type: 'POST',
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            receiverEmail = data.email;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    console.log(receiverEmail);
    return receiverEmail;
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
            window.location="/index.html";
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
            window.location="/index.html";
        }.bind(this),
        error: function(data, status, headers, config){
            localStorage.token="";
        }.bind(this)
    });
}





















