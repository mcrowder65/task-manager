var app= angular.module('app');
app.controller('addEmail', ['$scope', function ($scope) {
   $scope.sendEmail = function() {
        if($scope.senderEmail == undefined || $scope.senderEmail == null || $scope.senderEmail == ""
         || $scope.senderPassword == undefined || $scope.senderPassword == null || $scope.senderPassword == ""
         || $scope.receiverEmail == undefined || $scope.receiverEmail == null || $scope.receiverEmail == ""
         || $scope.dateToSend == undefined || $scope.dateToSend == null || $scope.dateToSend == ""
         || $scope.timeToSend == undefined || $scope.timeToSend == null || $scope.timeToSend == ""
         || (($scope.subject == undefined || $scope.subject == null || $scope.subject == "")
         && ($scope.emailBody == undefined || $scope.emailBody == null || $scope.emailBody == ""))
         || !verifyInput($scope)) {
            showEmailConfirmationBanner(false);
            return;
        }
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
   
}]);
/*******************************************************************************************************************/
                                                //BASIC FUNCTIONS
/*******************************************************************************************************************/

function verifyInput(scope){
    var senderEmail = scope.senderEmail;
    var receiverEmail = scope.receiverEmail;
    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!regex.test(senderEmail) || !regex.test(receiverEmail)) {
        return false;
    }

    //TODO verify this
    var dateToSend = scope.dateToSend;
    
    console.log("dateToSend: " + dateToSend);
    //TODO verify this
    var timeToSend = scope.timeToSend;
    console.log("timeToSend: " + timeToSend);
    return true;
}
function showEmailConfirmationBanner(success){

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
function setEmail(email){
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
//TODO make its own server receiver
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

function sendEmailToServer(data){
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