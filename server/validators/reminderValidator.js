const utilities = require('../utilities');
const validateNewReminder = (scope) => {
  const senderEmail = scope.senderEmail;
  const receiverEmail = scope.receiverEmail;
  const receiverEmails = receiverEmail.split(',');
  for(let i = 0; i < receiverEmails.length; i++) {
      if(!utilities.validateEmailAddress(receiverEmails[i].trim())) {
        throw new Error('One of the receiver emails is not valid!')
      }
  }
  if(!utilities.validateEmailAddress(senderEmail.trim())) {
    throw new Error('Sender email is invalid');
  }

  const timeOfDay = scope.timeOfDay;
  if(!timeOfDay) {
    throw new Error('Time to send not set!');
  }
  if(!scope.subject) {
    throw new Error('No subject!');
  }
  if(!scope.subject && !scope.emailBody) {
    throw new Error('no subject and no body!');
  }
  const timeOfDayRegex = /^([0-2]?[0-9]:[0-5][0-9])$/;
  if(!timeOfDayRegex.test(timeOfDay)) {
    throw new Error('Time to send not formatted correctly!');
  }

  const hour = timeOfDay.split(':')[0];
  if(hour.length === 2) {
    if(parseInt(hour[0]) === 2) {
      if(parseInt(hour[1]) > 3) {
        throw new Error('If the first digit is 2 the second can\'t be greater than 3!')
      }
    }
  }
  return true;
}

module.exports = {
  validateNewReminder
};
