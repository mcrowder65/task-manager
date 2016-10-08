var app = angular.module('app');
var showRemindersMessage = "Don't show reminders on same day";
app.controller('addReminder', ['$scope', function($scope) {
    $scope.dateToSend = new Date();
    $scope.showReminders = true;
    $scope.showRemindersMessage = showRemindersMessage;
    $scope.init = function() {
        if(get('date') != null) {
            var date = new Date(parseInt(get('date')));
            $scope.dateToSend = date;
            $scope.showReminders = true;
            $scope.showRemindersMessage = "Don't show reminders on same day";
        }
    }
    $scope.newReminder = function() {
        if ($scope.senderEmail == undefined || $scope.senderEmail == null || $scope.senderEmail == "" || $scope.senderPassword == undefined || $scope.senderPassword == null || $scope.senderPassword == "" || $scope.receiverEmail == undefined || $scope.receiverEmail == null || $scope.receiverEmail == "" || $scope.dateToSend == undefined || $scope.dateToSend == null || $scope.dateToSend == "" || $scope.timeToSend == undefined || $scope.timeToSend == null || $scope.timeToSend == "" || (($scope.subject == undefined || $scope.subject == null || $scope.subject == "") && ($scope.emailBody == undefined || $scope.emailBody == null || $scope.emailBody == ""))) {
            showReminderConfirmationBanner(false);
            return;
        }
        try {
            var time = String($scope.dateToSend);
            time = time.match("([Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]* [0-9]* [0-9]{0,4})");
            time = time[0];
            var timeToSend = new Date(time + " " + $scope.timeToSend).getTime();
        } catch (err) {
            showReminderConfirmationBanner(false);
            return;
        }
        if (get('_id') == null) {

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
        
        $scope.reminders = getReminders();
        $scope.toggleShowReminders();
        $scope.toggleShowReminders();
    }
    
    $scope.toggleShowReminders = function() {
        $scope.showReminders = !$scope.showReminders;
        $scope.showRemindersMessage = !$scope.showReminders ? "Show reminders on same day":  "Don't show reminders on same day" ;
        $scope.reminders = getReminders();
    }
    $scope.doSomething = function() {
        // do something awesome
        focus('receiverEmail');
    };
    $scope.getReminder = function() {
        var reminder = getReminder(get('_id')).data;
        $scope.editing = false;
        if (reminder) {
            $scope.editing = true;
            $scope.dateToSend = reminder.dateToSend != null ? new Date(reminder.dateToSend) : $scope.dateToSend;
            $scope.timeToSend = reminder.timeOfDay != null ? reminder.timeOfDay : $scope.timeToSend;
            $scope.subject = reminder.subject;
            $scope.emailBody = reminder.emailBody;
            $scope.receiverEmail = reminder.receiverEmail != null ? reminder.receiverEmail : $scope.receiverEmail;
            $scope.senderEmail = reminder.senderEmail != null ? reminder.senderEmail : $scope.senderEmail;
            $scope.senderPassword = reminder.senderPassword != null ? reminder.senderPassword : $scope.senderPassword;
        }
    }
    $scope.stopEditing = function() {
        removeGet("_id", $scope.dateToSend.getTime());
    }
    $scope.showReminder = function(dateToSend) {
        if($scope.dateToSend == undefined || $scope.dateToSend == null) {
            return false;
        }
        var lTemp = new Date($scope.dateToSend);
        lTemp.setHours(0,0,0,0);
        var lTempDay = lTemp.getTime();
        var lTempDateToSendTemp = new Date(dateToSend);
        lTempDateToSendTemp.setHours(0,0,0,0);
        var lTempDateToSend = lTempDateToSendTemp.getTime();
        return lTempDay == lTempDateToSend;
    }
}]);
app.factory('focus', function($timeout, $window) {
    return function(id) {
        // timeout makes sure that it is invoked after any other event has been triggered.
        // e.g. click events that need to run before the focus or
        // inputs elements that are in a disabled state but are enabled when those events
        // are triggered.
        $timeout(function() {
            var element = $window.document.getElementById(id);
            if (element)
                element.focus();
        });
    };
});
/*******************************************************************************************************************/
//DIRECTIVES
/*******************************************************************************************************************/
app.directive('eventFocus', function(focus) {
    return function(scope, elem, attr) {
        elem.on(attr.eventFocus, function() {
            focus(attr.eventFocusId);
        });

        // Removes bound events in the element itself
        // when the scope is destroyed
        scope.$on('$destroy', function() {
            elem.off(attr.eventFocus);
        });
    };
});

/*******************************************************************************************************************/
//BASIC FUNCTIONS
/*******************************************************************************************************************/
function showReminderConfirmationBanner(success) {

    $(document).ready(function() {
        if (success === true) {
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
function setReminder(email) {
    $.ajax({
        url: "/setReminder",
        dataType: 'json',
        type: 'POST',
        async: false,
        data: email,
        success: function(data, status, headers, config) {
            showReminderConfirmationBanner(true);
        }.bind(this),
        error: function(data, status, headers, config) {
            showReminderConfirmationBanner(false);
        }.bind(this)
    });
}

function getReminder(_id) {
    var reminder = {};
    if (_id) {

        $.ajax({
            url: "/getReminder",
            dataType: 'json',
            type: 'POST',
            async: false,
            data: { _id: _id },
            success: function(data, status, headers, config) {
                reminder = data;
            }.bind(this),
            error: function(data, status, headers, config) {}.bind(this)
        });
    }
    return reminder;
}

function newReminder(data) {
    $.ajax({
        url: "/newReminder",
        dataType: 'json',
        type: 'POST',
        data: data,
        success: function(data, status, headers, config) {
            showReminderConfirmationBanner(true);
        }.bind(this),
        error: function(data, status, headers, config) {
            showReminderConfirmationBanner(false);
        }.bind(this)
    });
}