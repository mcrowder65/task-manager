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

  async getReminderById(_id) {
    const response = await this.$http({
      method: 'POST',
      url: '/getReminder',
      data: {
        _id,
        token: localStorage.token
      }
    });
    return response.data;
  }

  async createOrUpdate(_id, reminder) {
    if(_id) {
      await this.$http({
        method: 'POST',
        url: '/setReminder',
        data: {
          _id,
          senderEmail: reminder.senderEmail,
          senderPassword: reminder.senderPassword,
          receiverEmail: reminder.receiverEmail,
          timeToSend: reminder.timeToSend,
          emailBody: reminder.emailBody,
          subject: reminder.subject,
          dateToSend: reminder.dateToSend,
          timeOfDay: reminder.timeToSend,
          token: localStorage.token
        }
      });
    } else {
      // create
      await this.$http({
        method: 'POST',
        url: '/newReminder',
        data: {
          senderEmail: reminder.senderEmail,
          senderPassword: reminder.senderPassword,
          receiverEmail: reminder.receiverEmail,
          timeToSend: reminder.timeToSend,
          emailBody: reminder.emailBody,
          subject: reminder.subject,
          dateToSend: reminder.dateToSend,
          timeOfDay: reminder.timeToSend,
          token: localStorage.token
        }
      });
    }
  }
}

angular.module('reminderService', []).service('ReminderService', ['$http', ReminderService]);
