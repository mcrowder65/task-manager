
var app = angular.module('app', ['ngRoute']);

app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});

app.controller('SimpleController', function ($scope, simpleFactory) {
    
    //TODO add to all emails controller
    $scope.hideFields = function(email, type){
        if(type === 'body' && (email.emailBody == null || email.emailBody == "")){
            document.getElementById("body" + email._id).style.display = "none";
        }
        if(type === 'subject' && (email.subject == null || email.subject == "")){
            document.getElementById("subject" + email._id).style.display = "none";
        }
    }
    //TODO add to all emails controller
    $scope.deleteEmail = function(email){
        deleteEmail(email._id);
    }
    //TODO add to all emails controller
    $scope.getEmails = function(){
        $scope.emails = getEmails();
    }
    //Used in allEmails and Profile controller
    $scope.getSenderPassword = function() {
        $scope.senderPassword = getSenderPassword();
    }
    //TODO add to profile controller
    $scope.setSenderPassword = function() {
        setSenderPassword({_id: localStorage.token, senderPassword: $scope.senderPassword});
    }
    //Used in allEmails and Profile controller
    $scope.getSenderEmail = function() {
        $scope.senderEmail = getSenderEmail();
    }
    //TODO add to profile controller
    $scope.setSenderEmail = function() {
        setSenderEmail({_id: localStorage.token, senderEmail: $scope.senderEmail});
    }
    //TODO add to profile controller
    $scope.setReceiverEmail = function(){
        setReceiverEmail({_id: localStorage.token, receiverEmail: $scope.receiverEmail});
    }
    //TODO add to sign up controller
    $scope.signUp = function() {
        signUpUser($scope.username, $scope.confirmPassword);
    }
    //TODO add to login controller
    $scope.login = function() {
        login($scope.username, $scope.password);
    }
    //TODO add to sign up controller
    $scope.verifyPasswords = function() {
        verifyPasswords($scope.initialPassword, $scope.confirmPassword);
    }
    //TODO add to all emails controller
    $scope.sendEmailRightAway = function(email) {
        sendEmail(email._id);
    }
    //TODO add to all emails controller
    $scope.editEmail = function(_id){
        window.location.href = "/#/addEmail/?_id=" + _id;
        $scope.editing = true;
    }
    //used in allEmails and profile controller
    $scope.getReceiverEmail = function() {
        $scope.receiverEmail = getReceiverEmail();
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
/*******************************************************************************************************************/
                                                //BASIC FUNCTIONS
/*******************************************************************************************************************/


function get(parameter) {  
  var url = window.location.href;
  var index = url.indexOf(parameter);
  if(index == -1)
    return null;
  index += parameter.length + 1; //if the word we're looking for is address, get a index
                                 //then add address.length +1 to get start of value 
   
  var i = index;
  while(url[i] != '?' && url[i] != '&') {
    if(i > url.length)
      break;
    i++;
  }
  return url.substring(index, i);
} 
//TODO add to sign up controller
function changePasswordBoxColor(color){
    $( document ).ready(function() {
        $("#initialPassword").css("borderColor", color);
        $("confirmPassword").css("borderColor", color);
    });
}
//TODO add to sign up controller
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


/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/

//TODO add to allEmails controller
function sendEmail(_id){
    $.ajax
    ({
        url: "/sendEmail",
        dataType: "json",
        type: "POST",
        async: false,
        data: {_id: _id},
        success: function(data, status, headers, config){
            window.location = '/#/profile';
            window.location = '/#/allEmails';
        }.bind(this),
        error: function(data, status, headers, config){

        }.bind(this)
    });
}
//TODO add to allEmails controller
function deleteEmail(_id){
    $.ajax
    ({
        url: "/deleteEmail",
        dataType: "json",
        type: "POST",
        async: false,
        data: {_id: _id},
        success: function(data, status, headers, config){
            window.location = '/#/profile';
            window.location = '/#/allEmails';
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
}
//TODO add to profile controller
function setReceiverEmail(data){
    if(data.receiverEmail) {
        $.ajax
        ({
            url: "/setReceiverEmail",
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data, status, headers, config){
            }.bind(this),
            error: function(data, status, headers, config){
            }.bind(this)
        });
    }
}
//TODO do i have to have this global variable?
var receiverEmail = '';
function getReceiverEmail(){
    
    $.ajax
    ({
        url: "/getReceiverEmail",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            receiverEmail = data.email;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return receiverEmail;
}
//TODO do i have to have this global variable?
var senderEmail = '';
function getSenderEmail(){
    $.ajax
    ({
        url: "/getSenderEmail",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            senderEmail = data.senderEmail;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return senderEmail;
}

//TODO add to profile controller
function setSenderEmail(data){
    if(data.senderEmail) {
        $.ajax
        ({
            url: "/setSenderEmail",
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data, status, headers, config){
                senderEmail = data.senderEmail;
            }.bind(this),
            error: function(data, status, headers, config){
            }.bind(this)
        });
    }
}
//TODO do i have to have this global variable?
var senderPassword = '';
function getSenderPassword(){
    $.ajax
    ({
        url: "/getSenderPassword",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            senderPassword = data.senderPassword;
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return senderPassword;
}
//TODO add to profile controller
function setSenderPassword(data){
    if(data.senderPassword) {
        $.ajax
        ({
            url: "/setSenderPassword",
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data, status, headers, config){
                senderPassword = data.senderPassword;
            }.bind(this),
            error: function(data, status, headers, config){
            }.bind(this)
        });
    }
}
//TODO add to sign up controller
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
//TODO add to login controller
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
//TODO add to all emails controller
//TODO do i need this global variable?
var emails = [];
function getEmails(){
    $.ajax
    ({
        url: "/getEmails",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            emails = data;
            for(var i = 0; i < emails.length; i++) {
                var date = new Date(emails[i].timeToSend)
                emails[i].date = (date.getMonth() + 1) + "/" + date.getDate()  + " " + date.toLocaleTimeString()
            }
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return emails;
}




















