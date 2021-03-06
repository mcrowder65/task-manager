const AddReminderController = async($scope, $http, UserService, ReminderService, UtilitiesService) => {
  $scope.init = async() => {
    try {
      if(!$scope.isLoggedIn()) {
        $scope.openToast('You must be logged in to see this page');
        $scope.reroute('/#!/login');
        return;
      }
      $scope.dateToSend = new Date();
      $scope.showReminders = true;
      $scope.showRemindersMessage = 'Don\'t show reminders on same day';
      if(UtilitiesService.get('date') != null) {
        $scope.dateToSend = new Date(parseInt(UtilitiesService.get('date')));
      }
      $scope.dayOfWeek = UtilitiesService.getWeekDay($scope.dateToSend)
      $scope.reminders = await ReminderService.getAllUserRemindersByDay($scope.dateToSend);
      const user = await UserService.getLoggedInUser();
      $scope.senderEmail = user.senderEmail;
      $scope.receiverEmail = user.receiverEmail;
      $scope.senderPassword = user.senderPassword;
      $scope.getReminder();
      $scope.$apply();
    } catch(error) {
      $scope.openToast('something went wrong :(');
    }
  }

  $scope.timeToSendChange = () => {
    if($scope.timeToSend) {
      $scope.timeToSend = $scope.timeToSend.replace(';', ':');
    }
  }
  $scope.sendReminderImmediately = async(_id, date) => {
    try {
      await ReminderService.sendReminderImmediately(_id, date);
    } catch(error) {
      console.error('error while sending reminder immediately ', error);
    }

  }
  $scope.newReminder = async() => {
    try {
      let time = String($scope.dateToSend);
      time = time.match('([Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]* [0-9]* [0-9]{0,4})');
      time = time[0];
      $scope.timeToSend = $scope.timeToSend.trim();
      const timeToSend = new Date(time + ' ' + $scope.timeToSend).getTime();
      const _id = UtilitiesService.get('_id');
      await ReminderService.createOrUpdate(_id, {
        senderEmail: $scope.senderEmail,
        senderPassword: $scope.senderPassword,
        receiverEmail: $scope.receiverEmail,
        timeToSend,
        emailBody: $scope.emailBody,
        subject: $scope.subject,
        dateToSend: $scope.dateToSend,
        timeOfDay: $scope.timeToSend,
        token: localStorage.token
      });
      $scope.openToast('Reminder set');
    } catch(err) {
      $scope.openToast('Something went wrong');
      console.error('error while making reminder or setting reminder ', err);
    }
  }

  $scope.toggleShowReminders = async() => {
    try {
      $scope.showReminders = !$scope.showReminders;
      $scope.showRemindersMessage = !$scope.showReminders ? 'Show reminders on same day' : 'Don\'t show reminders on same day';
      $scope.reminders = await ReminderService.getAllUserRemindersByDay($scope.dateToSend);
      $scope.$apply();
    } catch(error) {
      console.error('error in toggleShowReminders ', error);
    }
  }

  $scope.dateChange = async() => {
    try {
      $scope.reminders = await ReminderService.getAllUserRemindersByDay($scope.dateToSend);
      $scope.dayOfWeek = UtilitiesService.getWeekDay($scope.dateToSend)
      $scope.$apply();
    } catch(error) {
      console.error('error in dateChange ', error)
    }
  }

  $scope.deleteReminder = async(_id, date) => {
    try {
      await ReminderService.deleteReminder(_id);
    } catch(error) {
      console.error('something went wrong while deleting the reminder ', error);
      $scope.openToast('Woops... something went wrong')
    }
  }

  $scope.getReminder = async() => {
    try {
      const _id = UtilitiesService.get('_id');
      if(_id) {

        const reminder = await ReminderService.getReminderById(_id);
        $scope.editing = true;
        $scope.dateToSend = reminder.dateToSend != null ? new Date(reminder.dateToSend) : $scope.dateToSend;
        $scope.timeToSend = reminder.timeOfDay != null ? reminder.timeOfDay : $scope.timeToSend;
        $scope.subject = reminder.subject;
        $scope.emailBody = reminder.emailBody;
        $scope.receiverEmail = reminder.receiverEmail != null ? reminder.receiverEmail : $scope.receiverEmail;
        $scope.dateChange();
        $scope.$apply();
      }

    } catch(error) {
      console.error('Something went wrong while trying to edit reminder ', error);
      $scope.openToast('Woops something went wrong fetching that one..');
    }

  }

  $scope.stopEditing = () => {
    UtilitiesService.removeGet('_id', $scope.dateToSend.getTime());
  }
  $scope.updateReminders = (_id) => {
    $scope.reminders = $scope.reminders.filter((reminder) => {
      return reminder._id !== _id;
    })
    $scope.$apply();
  }
  $scope.minusOne = async () => {
    const oldDate = $scope.dateToSend;
    $scope.dateToSend = new Date();
    $scope.dateToSend.setMonth(oldDate.getMonth());
    $scope.dateToSend.setDate( oldDate.getDate() - 1);
    $scope.dateToSend.setFullYear(oldDate.getFullYear());
    await $scope.dateChange()
  };

  $scope.plusOne = async () => {
    const oldDate = $scope.dateToSend;
    $scope.dateToSend = new Date();
    $scope.dateToSend.setMonth(oldDate.getMonth());
    $scope.dateToSend.setDate( oldDate.getDate() + 1);
    $scope.dateToSend.setFullYear(oldDate.getFullYear());
    await $scope.dateChange()
  }
  const queueSocket = io(window.location.hostname + ':7999');
  queueSocket.on('remove-reminder', (data) => {
    try {
      $scope.updateReminders(data._id)
    } catch(error) {
      console.error(error);
    }
  });

  //TODO move to 443 when https
  const serverSocket = io(window.location.hostname + ':' + (window.location.hostname === 'localhost' ? '3000' : '80'));

  serverSocket.on('reminders-updated', async() => {
    try {
      $scope.reminders = await ReminderService.getAllUserRemindersByDay($scope.dateToSend);
      $scope.$apply();
    } catch(error) {
      console.error(error);
    }
  });

};

angular.module('app').controller('addReminder', ['$scope', '$http', 'UserService', 'ReminderService', 'UtilitiesService', AddReminderController]);
