class ReminderService {
  constructor($http) {
    this.$http = $http;
  }

  async getAllUserReminders() {
    const response = await this.$http({
      method: 'POST',
      url: '/getReminders',
      data: {
        token: localStorage.token
      }
    });
    return response.data.map((reminder) => {
      const date = new Date(reminder.timeToSend)
      reminder.date = (date.getMonth() + 1) + "/" + date.getDate() + " " + date.toLocaleTimeString()
      return reminder;
    });
  };

  async sendReminderImmediately(_id, date) {
    await this. $http({
      method: 'POST',
      url: '/sendReminderImmediately',
      data: {
        _id,
        token: localStorage.token
      }
    });
  };

  async getAllUserRemindersByDay(date) {
    const response = await this.$http({
      method: 'POST',
      url: '/getRemindersByDay',
      data: {
        currentDay: date || new Date(),
        token: localStorage.token
      }
    });
    return response.data.map((reminder) => {
      const date = new Date(reminder.timeToSend)
      reminder.date = (date.getMonth() + 1) + "/" + date.getDate() + " " + date.toLocaleTimeString()
      // TODO change to object spread when it becomes available
      return reminder;
    });
  };

  async deleteReminder(_id) {
    await this.$http({
      method: 'POST',
      url: '/deleteReminder',
      data: {
        _id,
        token: localStorage.token
      }
    });
  }
}

angular.module('reminderService', []).service('ReminderService', ['$http', ReminderService]);
