var app= angular.module('app');
app.controller('allReminders', ['$scope', function ($scope) {

   $scope.hideFields = function(email, type) {
       if(type === 'body' && (email.emailBody == null || email.emailBody == "")){
            $("#body" + email._id).css("display", "none");
        }
        if(type === 'subject' && (email.subject == null || email.subject == "")) { 
            $("#subject" + email._id).css("display", "none");
        }
    }

    $scope.deleteEmail = function(email){
        deleteEmail(email._id);
    }

    $scope.getEmails = function(){
        $scope.emails = getEmails();
    }

    $scope.sendEmailImmediately = function(email) {
        sendEmailImmediately(email._id);
    }

    $scope.editEmail = function(_id){
        window.location.href = "/#/addEmail/?_id=" + _id;
        $scope.editing = true;
    }
}]);


/**************************************************************************************************************************************
                                                             SERVER SENDERS
***************************************************************************************************************************************/

function deleteEmail(_id) {
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

function getEmails() {
    var emails = [];
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

function sendEmailImmediately(_id) {
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

