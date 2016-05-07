    
var app = angular.module('app', ['ngRoute']);

app.factory('simpleFactory', function(){
	var persons = [
		{ myFirstName: 'Matt', myLastName: 'Crowder' }
	];
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
        templateUrl: 'html/allEmails.html'
    })
    .when('/allEmails',	
    {
		controller: 'SimpleController',
        templateUrl: 'html/allEmails.html'
    })
    .when('/day',
    {
    	controller: 'SimpleController',
        templateUrl: 'html/day.html'
    })
    .when('/week',
    {
    	controller: 'SimpleController',
        templateUrl: 'html/week.html'
    })
    .when('/month',
    {
    	controller: 'SimpleController',
        templateUrl: 'html/month.html'
    })
    .when('/addEmail',
    {
    	controller: 'SimpleController',
    	templateUrl: 'html/addEmail.html'
    })
    .when('/profile',
    {
    	controller: 'SimpleController',
    	templateUrl: 'html/profile.html'
    })
    .when('/signup',
    {
    	controller: 'SimpleController',
        templateUrl: 'html/signup.html'
    })
    .when('/login',
    {
    	controller: 'SimpleController',
        templateUrl: 'html/login.html'
    })
    .otherwise({ redirectTo: '/allEmails' });

});

function sendEmailToServer(data){
    console.log('sending data: ' + JSON.stringify(data));
    var url = "server/newEmail";
    $.ajax
    ({
        url: url,
        dataType: 'json',
        type: 'POST',
        data: data,
        async:false,
        success: function(data, status, headers, config){
          console.log(status);
          
        }.bind(this),
        error: function(data, status, headers, config){
            console.log(status);
        }.bind(this)
    });
}