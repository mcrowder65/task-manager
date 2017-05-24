var app= angular.module('app');

app.controller('allReminders', ['$scope', function ($scope) {
    $scope.addEndDateMessage = "Add end date";
    $scope.init = async () => {
      $scope.reminders = $scope.getReminders();
    }
    $scope.showReminder = function(dateToSend) {
        if($scope.day == undefined || $scope.day == null) {
            return true;
        }
        var lTempDay = new Date($scope.day).getTime();
        var lTempDateToSend = new Date(dateToSend).getTime();
        if($scope.endDay != null) {
            var lTempEndDay = new Date($scope.endDay).getTime();
            return lTempDay <= lTempDateToSend && lTempDateToSend <= lTempEndDay;
        }
        return lTempDay <= lTempDateToSend && lTempDateToSend <= lTempDay + (MILLISECONDS_IN_DAY - 1);
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
