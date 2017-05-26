var app = angular.module('app');
var showRemindersMessage = "Don't show reminders on same day";
app.controller('addReminder', ['$scope', '$http', async($scope, $http) => {
  $scope.dateToSend = new Date();
  $scope.showReminders = true;
  $scope.showRemindersMessage = showRemindersMessage;

  $scope.init = async() => {
    if (get('date') != null) {
      var date = new Date(parseInt(get('date')));
      $scope.dateToSend = date;
      $scope.showReminders = true;
      $scope.showRemindersMessage = "Don't show reminders on same day";
    }
    $scope.reminders = await $scope.getRemindersByDay();
    const user = await $scope.getById();
    $scope.senderEmail = user.senderEmail;
    $scope.receiverEmail = user.receiverEmail;
    $scope.senderPassword = user.senderPassword;
    $scope.getReminder();
    $scope.$apply();
  }

  $scope.computeClass = () => {
    // console.log('computeClass')
  }

  $scope.newReminder = async() => {
    if ($scope.senderEmail == undefined || $scope.senderEmail == null || $scope.senderEmail == "" || $scope.senderPassword == undefined || $scope.senderPassword == null || $scope.senderPassword == "" || $scope.receiverEmail == undefined || $scope.receiverEmail == null || $scope.receiverEmail == "" || $scope.dateToSend == undefined || $scope.dateToSend == null || $scope.dateToSend == "" || $scope.timeToSend == undefined || $scope.timeToSend == null || $scope.timeToSend == "" || (($scope.subject == undefined || $scope.subject == null || $scope.subject == "") && ($scope.emailBody == undefined || $scope.emailBody == null || $scope.emailBody == ""))) {
      $scope.openToast('Something went wrong');
      return;
    }
    try {
      let time = String($scope.dateToSend);
      time = time.match("([Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec]* [0-9]* [0-9]{0,4})");
      time = time[0];
      const timeToSend = new Date(time + " " + $scope.timeToSend).getTime();
      if (!get('_id')) {
        try {

        } catch (error) {

        }
        await $http({
          method: 'POST',
          url: '/newReminder',
          data: {
            senderEmail: $scope.senderEmail,
            senderPassword: $scope.senderPassword,
            receiverEmail: $scope.receiverEmail,
            timeToSend,
            emailBody: $scope.emailBody,
            subject: $scope.subject,
            userID: localStorage.token,
            dateToSend: $scope.dateToSend,
            timeOfDay: $scope.timeToSend,
            token: localStorage.token
          }
        });
      } else {
        await $http({
          method: 'POST',
          url: '/setReminder',
          data: {
            _id: get('_id'),
            senderEmail: $scope.senderEmail,
            senderPassword: $scope.senderPassword,
            receiverEmail: $scope.receiverEmail,
            timeToSend: timeToSend,
            emailBody: $scope.emailBody,
            subject: $scope.subject,
            dateToSend: $scope.dateToSend,
            timeOfDay: $scope.timeToSend,
            token: localStorage.token
          }
        });
      }
      $scope.openToast('Reminder set');
      $scope.reminders = await $scope.getRemindersByDay($scope.dateToSend);
      $scope.$apply();
    } catch (err) {
      $scope.openToast('Something went wrong');
      console.error('error while making reminder or setting reminder ', err);
    }
  }

  $scope.toggleShowReminders = async() => {
    console.log('toggleShowReminders')
    $scope.showReminders = !$scope.showReminders;
    $scope.showRemindersMessage = !$scope.showReminders ? "Show reminders on same day" : "Don't show reminders on same day";
    $scope.reminders = await $scope.getRemindersByDay($scope.dateToSend);
    $scope.$apply();
  }

  $scope.dateChange = async() => {
    $scope.reminders = await $scope.getRemindersByDay($scope.dateToSend);
    $scope.$apply();
  }

  $scope.getReminder = async() => {
    if (get('_id')) {
      const response = await $http({
        method: 'POST',
        url: '/getReminder',
        data: {
          _id: get('_id')
        }
      });
      const reminder = response.data;
      $scope.editing = true;
      $scope.dateToSend = reminder.dateToSend != null ? new Date(reminder.dateToSend) : $scope.dateToSend;
      $scope.timeToSend = reminder.timeOfDay != null ? reminder.timeOfDay : $scope.timeToSend;
      $scope.subject = reminder.subject;
      $scope.emailBody = reminder.emailBody;
      $scope.receiverEmail = reminder.receiverEmail != null ? reminder.receiverEmail : $scope.receiverEmail;
    }

  }

  $scope.stopEditing = () => {
    removeGet("_id", $scope.dateToSend.getTime());
  }
}]);
