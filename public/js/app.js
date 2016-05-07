    
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
    .otherwise({ redirectTo: '/allEmails' });

});

function sendEmailToServer(data){
    console.log('sending data: ' + JSON.stringify(data));
    $.ajax
    ({
        url: "/api/emails/newEmail",
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