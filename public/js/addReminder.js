var app= angular.module('app');
app.controller('addReminder', ['$scope', function ($scope) {
   $scope.newReminder = function() {
        if($scope.senderEmail == undefined || $scope.senderEmail == null || $scope.senderEmail == ""
         || $scope.senderPassword == undefined || $scope.senderPassword == null || $scope.senderPassword == ""
         || $scope.receiverEmail == undefined || $scope.receiverEmail == null || $scope.receiverEmail == ""
         || $scope.dateToSend == undefined || $scope.dateToSend == null || $scope.dateToSend == ""
         || $scope.timeToSend == undefined || $scope.timeToSend == null || $scope.timeToSend == ""
         || (($scope.subject == undefined || $scope.subject == null || $scope.subject == "")
         && ($scope.emailBody == undefined || $scope.emailBody == null || $scope.emailBody == ""))
         || !verifyInput($scope)) {
            showReminderConfirmationBanner(false);
            return;
        }
        try {
            var time = String($scope.dateToSend);
            time = time.match("([Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]* [0-9]* [0-9]{0,4})");
            time = time[0];
            var timeToSend = new Date(time + " " + $scope.timeToSend).getTime();
        } catch(err) {
            showReminderConfirmationBanner(false);
            return; 
        }
        if(get('_id') == null){
            newReminder({
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
            setReminder({
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
    $scope.getReminder = function() {
        var reminder = getReminder(get('_id')).data;
        if(reminder) {
            $scope.dateToSend = reminder.dateToSend != null ? new Date(reminder.dateToSend) : $scope.dateToSend;
            $scope.timeToSend = reminder.timeOfDay != null ? reminder.timeOfDay : $scope.timeToSend   ;
            $scope.subject = reminder.subject;
            $scope.emailBody = reminder.emailBody;
            $scope.receiverEmail = reminder.receiverEmail != null ? reminder.receiverEmail : $scope.receiverEmail;
            $scope.senderEmail = reminder.senderEmail != null ? reminder.senderEmail : $scope.senderEmail;
            $scope.senderPassword = reminder.senderPassword != null ? reminder.senderPassword : $scope.senderPassword;
        }
    }
   
}]);
/*******************************************************************************************************************/
                                                //BASIC FUNCTIONS
/*******************************************************************************************************************/

function verifyInput(scope) {
    var senderEmail = scope.senderEmail;
    var receiverEmail = scope.receiverEmail;
    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var receiverEmails = receiverEmail.split(',');
    for(var i = 0; i < receiverEmails.length; i++) {
        if(!regex.test(receiverEmails[i])){
            return false;
        }
    }
    if(!regex.test(senderEmail)) {
        return false;
    }
    return true;
}
function showReminderConfirmationBanner(success){

    $( document ).ready(function() {
        if(success === true){
            $("#successMessage").attr("class", "alert alert-success");
            $("#successMessage").text("Your reminder has been set!");
        } else {
            $("#successMessage").attr("class", "alert alert-danger");
            $("#successMessage").text("Something went wrong! Your reminder wasn't set.");
        }
        $("#successMessage").css("visibility", "visible");
        var millisecondsToWait = 2000;
        setTimeout(function() {
                $('#successMessage').css("visibility", "hidden");
        }, millisecondsToWait);
    });
}

/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/
function setReminder(email){
    $.ajax
    ({
        url: "/setReminder",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: email,
        success: function(data, status, headers, config){
            showReminderConfirmationBanner(true);
        }.bind(this),
        error: function(data, status, headers, config){
            showReminderConfirmationBanner(false);
        }.bind(this)
    });
}
function getReminder(_id){
    var reminder = {};
    if(_id) {
    
        $.ajax
        ({
            url: "/getReminder",
            dataType: 'json',
            type: 'POST',
            async: false,
            data: {_id: _id},
            success: function(data, status, headers, config){
                reminder = data;
            }.bind(this),
            error: function(data, status, headers, config){
            }.bind(this)
        });
    }
    return reminder;
}

function newReminder(data){
    $.ajax
    ({
        url: "/newReminder",
        dataType: 'json',
        type: 'POST',
        data: data,
        success: function(data, status, headers, config){
          showReminderConfirmationBanner(true);
        }.bind(this),
        error: function(data, status, headers, config){
          showReminderConfirmationBanner(false);
        }.bind(this)
    });
}