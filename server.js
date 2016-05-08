var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var api = require('./models/api.js');

app.use(express.static(__dirname + ''));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));
var nodemailer = require('nodemailer');


var portNumber = 8000
var server = app.listen(portNumber, function() {
console.log("Started on port " + portNumber);
var host = server.address().address;
var port = server.address().port;
});



/**************************************************
					SERVER RECEIVERS
***************************************************/

var email = require('./models/email.js');
app.post('/newEmail', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: req.body.sendingEmail,
			pass: req.body.sendingPassword
		}
	});

	var mailOptions = {
		from: req.body.sendingEmail,
		to: req.body.receivingEmail,
		subject: 'do this',
		html: req.body.emailBody
	};
	email.findOrCreate({
		sendingEmail: req.body.sendingEmail,
		sendingPassword: req.body.sendingPassword,
		receivingEmail: req.body.receivingEmail,
		emailBody: req.body.emailBody,
		timeToSend: req.body.timeToSend
	}, function(err, email, created) {
		if (created) {

		}
		else if(driveway)
			res.json({});
		else
			res.sendStatus("403");
	});
	//transporter.sendMail(mailOptions); 

	res.json(req.body);
});

























