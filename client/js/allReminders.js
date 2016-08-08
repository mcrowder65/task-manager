var app= angular.module('app');
var MILLISECONDS_IN_DAY = 86400000;
app.controller('allReminders', ['$scope', function ($scope) {
    $scope.addEndDateMessage = "Add end date";
    $scope.deleteReminder = function(reminder){
        deleteReminder(reminder._id);
    }

    $scope.getReminders = function(){
        $scope.reminders = getReminders();
    }

    $scope.sendReminderImmediately = function(reminder) {
        sendReminderImmediately(reminder._id);
    }

    $scope.editReminder = function(_id){
        window.location.href = "/#/addReminder/?_id=" + _id;
    }

    $scope.showReminder = function(dateToSend) {
        if($scope.day == undefined || $scope.day == null) {
            return true;
        }
        if($scope.endDay != null) {
            var lTempEndDay = new Date($scope.endDay).getTime();
            var lTempDateToSend = new Date(dateToSend).getTime();
            var lTempDay = new Date($scope.day).getTime();
            return lTempDay <= lTempDateToSend && lTempDateToSend <= lTempEndDay;
        }
        return $scope.day == dateToSend;
    }

    $scope.addEndDateClickedChange = function(override) {
        if(override != null) {
            $scope.addEndDateClicked = false;
            $scope.addEndDateMessage = "Add end date";
            $scope.endDay = null;
        } else {
            $scope.addEndDateClicked = $scope.addEndDateClicked == null ? false : $scope.addEndDateClicked;
            $scope.addEndDateClicked = !$scope.addEndDateClicked;
            $scope.addEndDateMessage = $scope.addEndDateClicked ? "Remove end date" : "Add end date";
            $scope.endDay = $scope.addEndDateClicked == false ? null : $scope.endDay;
        }
        
    }
}]);


/**************************************************************************************************************************************
                                                             SERVER SENDERS
***************************************************************************************************************************************/

function deleteReminder(_id) {
    $.ajax
    ({
        url: "/deleteReminder",
        dataType: "json",
        type: "POST",
        async: false,
        data: {_id: _id},
        success: function(data, status, headers, config){
            window.location = '/#/profile';
            window.location = '/#/allReminders';
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
}

function getReminders() {
    var reminders = [];
    $.ajax
    ({
        url: "/getReminders",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: {id: localStorage.token},
        success: function(data, status, headers, config){
            reminders = data;
            for(var i = 0; i < reminders.length; i++) {
                var date = new Date(reminders[i].timeToSend)
                reminders[i].date = (date.getMonth() + 1) + "/" + date.getDate()  + " " + date.toLocaleTimeString()
            }
        }.bind(this),
        error: function(data, status, headers, config){
        }.bind(this)
    });
    return reminders;
}

function sendReminderImmediately(_id) {
    $.ajax
    ({
        url: "/sendReminderImmediately",
        dataType: "json",
        type: "POST",
        async: false,
        data: {_id: _id},
        success: function(data, status, headers, config){
            window.location = '/#/profile';
            window.location = '/#/allReminders';
        }.bind(this),
        error: function(data, status, headers, config){

        }.bind(this)
    });
}

