var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));
var nodemailer = require('nodemailer');

var email = require('./models/email.js');

var portNumber = 7999
var server = app.listen(portNumber, function() {
console.log("Started on port " + portNumber);
var host = server.address().address;3
var port = server.address().port;
});

app.post('/getEmails',
	function (req, res){
		email.find({},
		function(err, tempEmail)
		{});
	}
);
function checkEmails() {
	email.find({}, function(err, emails, created) {
		for(var i = 0; i < emails.length; i++){
			if(emails[i].timeToSend.getTime() < new Date().getTime()){
				sendEmail(emails[i]);
			}
		}
	});
	
}
function sendEmail(emailObj){
	var receiverEmails = emailObj.receiverEmail.split(",");

	for(var i = 0; i < receiverEmails.length; i++){
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: emailObj.senderEmail,
				pass: emailObj.senderPassword
			}
		});

		var mailOptions = {
			from: emailObj.senderEmail,
			to: receiverEmails[i],
			subject: emailObj.subject,
			html: emailObj.emailBody
		};
		transporter.sendMail(mailOptions);
	}
	
	email.remove({_id: emailObj._id},function(err, tempEmail){});
}
setInterval(checkEmails, 30000);
