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
            }.bind(this),
            error: function(data, status, headers, config){
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
            }.bind(this),
            error: function(data, status, headers, config){
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
            }.bind(this),
            error: function(data, status, headers, config){
            }.bind(this)
        });
    }
}