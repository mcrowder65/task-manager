var nodemailer = require('nodemailer');
var log = require('./models/log');
module.exports = {
  validateEmailAddress: function (email) {
  	var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return !regex.test(email) ? false : true;
  },
  sendReminder: function(reminder) {
  	var receiverEmails = reminder.receiverEmail.split(",");
	for(var i = 0; i < receiverEmails.length; i++){
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: reminder.senderEmail,
				pass: reminder.senderPassword
			}
		});

		var mailOptions = {
			from: reminder.senderEmail,
			to: receiverEmails[i],
			subject: reminder.subject,
			html: reminder.emailBody
		};
		transporter.sendMail(mailOptions, 
			function(error, info) {
			    if(error) {
		    	   	log.info(reminder + " " + error);
			    }
			}

		);
		
	}
  }
};
