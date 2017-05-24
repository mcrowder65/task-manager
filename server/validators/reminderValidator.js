var utilities = require('../utilities');


module.exports = {
    validateNewReminder: (scope) => {
	    var senderEmail = scope.senderEmail;
	    var receiverEmail = scope.receiverEmail;
	    var receiverEmails = receiverEmail.split(',');
	    for(var i = 0; i < receiverEmails.length; i++) {
	        if(!utilities.validateEmailAddress(receiverEmails[i].trim())){
	        	return false;
	        }
	    }
	    if(!utilities.validateEmailAddress(senderEmail.trim())) {
	        return false;
	    }
	    return true;
	}
};
