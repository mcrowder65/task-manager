var utilities = require('../utilities');

module.exports = {
  validateReceiverEmail: function (receiverEmails) {
  	var receiverEmails = receiverEmails.split(',');
  	for(var i = 0; i < receiverEmails.length; i++) {
		if(!utilities.validateEmailAddress(receiverEmails[i].trim())) {
			return false;
		}
  	}
    return true;
  },
  validateSenderEmail: function(senderEmail) {
  	return !utilities.validateEmailAddress(senderEmail) ? false : true;
  }
};