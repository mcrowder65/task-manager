const MILLISECONDS_IN_DAY = 86400000;

function allRemindersController($scope, ReminderService) {
  $scope.init = async() => {
    $scope.addEndDateMessage = 'Add end date';
    $scope.reminders = await ReminderService.getAllUserReminders();

    $scope.$apply();
  }
  $scope.sendReminderImmediately = async(_id, date) => {
    try {
      await ReminderService.sendReminderImmediately(_id, date);
      $scope.reminders = await ReminderService.getAllUserRemindersByDay(date);
      $scope.$apply();
    } catch(error) {
      console.error('error while sending reminder immediately ', error);
    }

  }

  $scope.deleteReminder = async(_id) => {
    try {
      await ReminderService.deleteReminder(_id);
      $scope.reminders = await ReminderService.getAllUserReminders();
      $scope.$apply();
    } catch(error) {
      console.error('something went wrong while deleting the reminder ', error);
      $scope.openToast('Woops... something went wrong')
    }
  }

  $scope.showReminder = (dateToSend) => {
    if(!$scope.day) {
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

  $scope.addEndDateClickedChange = (override) => {
    if(override) {
      $scope.addEndDateClicked = false;
      $scope.addEndDateMessage = 'Add end date';
      $scope.endDay = null;
    } else {
      $scope.addEndDateClicked = $scope.addEndDateClicked == null ? false : $scope.addEndDateClicked;
      $scope.addEndDateClicked = !$scope.addEndDateClicked;
      $scope.addEndDateMessage = $scope.addEndDateClicked ? 'Remove end date' : 'Add end date';
      $scope.endDay = $scope.addEndDateClicked == false ? null : $scope.endDay;
    }
  }

  $scope.updateReminders = (_id) => {
    $scope.reminders = $scope.reminders.filter( (reminder) => {
      return reminder._id !== _id;
    })
    $scope.$apply();
  }
  const socket = io(window.location.hostname + ':7999');
  socket.on('remove-reminder', (data) => {
    $scope.updateReminders(data._id)
  });
}
angular.module('app').controller('allReminders', ['$scope', 'ReminderService', allRemindersController]);
