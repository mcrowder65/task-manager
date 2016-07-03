var app= angular.module('app');
app.controller('profile', ['$scope', function ($scope) {

    $scope.setSenderPassword = function() {
        setSenderPassword({_id: localStorage.token, senderPassword: $scope.senderPassword});
    }

    $scope.setSenderEmail = function() {
        setSenderEmail({_id: localStorage.token, senderEmail: $scope.senderEmail});
    }

    $scope.setReceiverEmail = function(){
        setReceiverEmail({_id: localStorage.token, receiverEmail: $scope.receiverEmail});
    }
}]);
/*******************************************************************************************************************
                                                Utility functions
*******************************************************************************************************************/
function outline(id, color){
    id = "#" + id;
    $(id).css("borderColor", color);
    var millisecondsToWait = 2000;
    setTimeout(function() {
        $(id).css("borderColor", "initial");
    }, millisecondsToWait);
}

/*******************************************************************************************************************/
                                                //Server senders
/*******************************************************************************************************************/

function setSenderPassword(data) {
    if(data.senderPassword) {
        $.ajax
        ({
            url: "/setSenderPassword",
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data, status, headers, config){
                senderPassword = data.senderPassword;
                outline("senderEmailPassword", "lime");
            }.bind(this),
            error: function(data, status, headers, config) {
                outline("senderEmailPassword", "red");
            }.bind(this)
        });
    }
}

function setSenderEmail(data) {
    if(data.senderEmail) {
        $.ajax
        ({
            url: "/setSenderEmail",
            dataType: 'json',
            type: 'POST',
            data: data,
            success: function(data, status, headers, config){
                senderEmail = data.senderEmail;
                outline("senderEmailAccount", "lime");
            }.bind(this),
            error: function(data, status, headers, config){
                outline("senderEmailAccount", "red");
            }.bind(this)
        });
    }
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
                outline("receiverEmailAccount", "lime");
            }.bind(this),
            error: function(data, status, headers, config){
                outline("receiverEmailAccount", "red");
            }.bind(this)
        });
    }
}