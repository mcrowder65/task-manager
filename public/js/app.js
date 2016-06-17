
var app = angular.module('app', ['ngRoute']);

app.factory('simpleFactory', function(){
    var factory = {};

    return factory;
});
app.controller('SimpleController', function ($scope, simpleFactory) {
    $scope.sendEmail = function() {
        try {
            var time = String($scope.dateToSend);
            time = time.match("([Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]* [0-9]* [0-9]{0,4})");
            time = time[0];
            var timeToSend = new Date(time + " " + $scope.timeToSend).getTime();
        } catch(err) {
            showEmailConfirmationBanner(false);
            return; 
        }
        if(get('_id') == null){
            sendEmailToServer({
                senderEmail: $scope.senderEmail,
                senderPassword: $scope.senderPassword,
                receiverEmail: $scope.receiverEmail,
                timeToSend: timeToSend,
                emailBody: $scope.emailBody,
                subject: $scope.subject,
                userID: localStorage.token,
                dateToSend: $scope.dateToSend,
                timeOfDay: $scope.timeToSend
            });
        } else {
            setEmail({
                _id: get('_id'),
                senderEmail: $scope.senderEmail,
                senderPassword: $scope.senderPassword,
                receiverEmail: $scope.receiverEmail,
                timeToSend: timeToSend,
                emailBody: $scope.emailBody,
                subject: $scope.subject,
                userID: localStorage.token,
                dateToSend: $scope.dateToSend,
                timeOfDay: $scope.timeToSend
            });
        }
    }
    $scope.hideFields = function(email, type){
        if(type === 'body' && (email.emailBody == null || email.emailBody == "")){
            document.getElementById("body" + email._id).style.display = "none";
        }
        if(type === 'subject' && (email.subject == null || email.subject == "")){
            document.getElementById("subject" + email._id).style.display = "none";
        }
    }
    $scope.deleteEmail = function(email){
        deleteEmail(email._id);
    }
    $scope.getEmails = function(){
        $scope.emails = getEmails();
    }
    $scope.getSenderPassword = function() {
        $scope.senderPassword = getSenderPassword();
    }
    $scope.setSenderPassword = function() {
        setSenderPassword({_id: localStorage.token, senderPassword: $scope.senderPassword});
    }
    $scope.getSenderEmail = function() {
        $scope.senderEmail = getSenderEmail();
    }
    $scope.setSenderEmail = function() {
        setSenderEmail({_id: localStorage.token, senderEmail: $scope.senderEmail});
    }
    $scope.setReceiverEmail = function(){
        setReceiverEmail({_id: localStorage.token, receiverEmail: $scope.receiverEmail});
    }
    $scope.getReceiverEmail = function() {
        $scope.receiverEmail = getReceiverEmail();
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
    $scope.sendEmailRightAway = function(email) {
        sendEmail(email._id);
    }
    $scope.editEmail = function(_id){
        window.location.href = "/#/addEmail/?_id=" + _id;
        $scope.editing = true;
    }
    $scope.getEmailData = function(){
        var email = getEmailData(get('_id'));
        $scope.dateToSend = email.dateToSend != null ? new Date(email.dateToSend) : $scope.dateToSend;//email.dateToSend;
        $scope.timeToSend = email.timeOfDay != null ? email.timeOfDay : $scope.timeToSend   ;
        $scope.subject = email.subject;
        $scope.emailBody = email.emailBody;
        $scope.receiverEmail = email.receiverEmail != null ? email.receiverEmail : $scope.receiverEmail;
        $scope.senderEmail = email.senderEmail != null ? email.senderEmail : $scope.senderEmail;
        $scope.senderPassword = email.senderPassword != null ? email.senderPassword : $scope.senderPassword;
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
function showEmailConfirmationBanner(success){
    if(success === true){
        document.getElementById('successMessage').className = 'alert alert-success';
        document.getElementById('successMessage').innerText = 'Your reminder has been set!';
        document.getElementById('successMessage').style.visibility = "visible";
    }
    else{
        document.getElementById("successMessage").className = "alert alert-danger";
        document.getElementById("successMessage").innerText= "Something went wrong! Your reminder wasn't set.";
        document.getElementById('successMessage').style.visibility = "visible";
    }
}
/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/
function setEmail(email){
    console.log(email);
    $.ajax
    ({
        url: "/setEmail",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: email,
        success: function(data, status, headers, config){
            showEmailConfirmationBanner(true);
        }.bind(this),
        error: function(data, status, headers, config){
            showEmailConfirmationBanner(false);
        }.bind(this)
    });
}
function getEmailData(_id){
    var email = {};
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
                email = emails[i]._id == _id ? emails[i] : email;
            }
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return email;
}
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
            console.log('error');
            console.log(status);
        }.bind(this)
    });
}
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
function setReceiverEmail(data){
    if(data.receiverEmail) {
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
}
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
function sendEmailToServer(data){
    console.log(data);
    $.ajax
    ({
        url: "/newEmail",
        dataType: 'json',
        type: 'POST',
        data: data,
        success: function(data, status, headers, config){
          showEmailConfirmationBanner(true);

        }.bind(this),
        error: function(data, status, headers, config){
          showEmailConfirmationBanner(false);
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




















