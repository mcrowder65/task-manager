var jQuery = require('jQuery');
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
var host = server.address().address;
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
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: emails[i].senderEmail,
						pass: emails[i].senderPassword
					}
				});

				var mailOptions = {
					from: emails[i].senderEmail,
					to: emails[i].receiverEmail,
					subject: emails[i].subject,
					html: emails[i].emailBody
				};
				transporter.sendMail(mailOptions);
				email.remove({_id: emails[i]._id},function(err, tempEmail){});
			}
		}
	});
	
}
setInterval(checkEmails, 1000);
