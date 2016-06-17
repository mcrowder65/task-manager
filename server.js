var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var nodemailer = require('nodemailer');
app.use(express.static(__dirname + ''));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));


var portNumber = 8000
var server = app.listen(portNumber, function() {
console.log("Started on port " + portNumber);
var host = server.address().address;
var port = server.address().port;
});


/**************************************************
					SERVER RECEIVERS
***************************************************/

app.post('/sendEmail', function(req, res){
	email.findOrCreate({
		_id: req.body._id
	}, function(err, email, created) {
		if(email) {
			res.json({})
			var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: email.senderEmail,
						pass: email.senderPassword
					}
				});

				var mailOptions = {
					from: email.senderEmail,
					to: email.receiverEmail,
					subject: email.subject,
					html: email.emailBody
				};
				transporter.sendMail(mailOptions);
				email.remove({_id: email._id},function(err, tempEmail){});
		}
		else
			res.sendStatus("403");
	});
});
app.post('/deleteEmail', function(req, res){
	email.remove({_id: req.body._id},
	function(err, email){
		if(email){
			res.json({})
		}
	});
	
});
var email = require('./models/email.js');
app.post('/newEmail', function(req, res){
		email.findOrCreate({
		senderEmail: req.body.senderEmail,
		senderPassword: req.body.senderPassword,
		receiverEmail: req.body.receiverEmail,
		emailBody: req.body.emailBody,
		timeToSend: req.body.timeToSend,
		subject: req.body.subject,
		userID: req.body.userID,
		dateToSend: req.body.dateToSend,
		timeOfDay: req.body.timeOfDay
	}, function(err, email, created) {
		if (created) {
			res.json({});
		}
		else if(email)
			res.json({});
		else
			res.sendStatus("403");
	});
});
app.post('/setEmail', function(req, res){
	console.log(req.body)
	email.update({_id: req.body._id}, {
		senderEmail: req.body.senderEmail,
		senderPassword: req.body.senderPassword,
		receiverEmail: req.body.receiverEmail,
		emailBody: req.body.emailBody,
		timeToSend: req.body.timeToSend,
		subject: req.body.subject,
		userID: req.body.userID,
		dateToSend: req.body.dateToSend,
		timeOfDay: req.body.timeOfDay
	},
	function(err, email) {
		if(email)
			res.json(req.body.receiverEmail);
		else
			res.sendStatus('403');
	});
})
app.post('/getReceiverEmail', function(req, res) {
	user.findOne({_id: req.body.id}, 
	function(err, tempUser) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (tempUser) {
            res.json({email:tempUser.receiverEmail});
       	} 
        else {
            res.sendStatus(403);
        }
	});
});
app.post('/setReceiverEmail', function(req, res) {
	user.update({_id: req.body._id}, {receiverEmail: req.body.receiverEmail},
	function(err, user) {
		if(user)
			res.json(req.body.receiverEmail);
		else
			res.sendStatus('403');
	});
});
app.post('/getSenderPassword', function(req, res) {
	user.findOne({_id: req.body.id}, 
	function(err, tempUser) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (tempUser) {
            res.json({senderPassword:tempUser.senderPassword});
       	} 
        else {
            res.sendStatus(403);
        }
	});
});
app.post('/setSenderPassword', function(req, res) {
	user.update({_id: req.body._id}, {senderPassword: req.body.senderPassword},
	function(err, user) {
		if(user)
			res.json(req.body.senderPassword);
		else
			res.sendStatus('403');
	});
});
app.post('/getSenderEmail', function(req, res) {
	user.findOne({_id: req.body.id}, 
	function(err, tempUser) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (tempUser) {
            res.json({senderEmail: tempUser.senderEmail});
       	} 
        else {
            res.sendStatus(403);
        }
	});
});
app.post('/setSenderEmail', function(req, res) {
	user.update({_id: req.body._id}, {senderEmail: req.body.senderEmail},
	function(err, user) {
		if(user)
			res.json(req.body.senderEmail);
		else
			res.sendStatus('403');
	});
});
var user = require('./models/user.js');
app.post('/signup', function(req, res) {
	user.findOrCreate({
		username: req.body.username,
		password: user.hashPassword(req.body.password),
		receiverEmail: '',
		senderEmail: '',
		senderPassword: ''
	}, function(err, tempUser, created) {
		if(created) {
			var token = user.generateToken(tempUser.username);
	        res.json({token: tempUser._id});
		}
		else if(!created){
			res.sendStatus("403");
		}
	});
});

app.post('/login', function(req, res) {
	user.findOne({username: req.body.username}, 
	function(err, tempUser) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (tempUser && tempUser.checkPassword(req.body.password)) {
            var token = tempUser._id;
            res.json({token:token});
       	} 
        else {
            res.sendStatus(403);
        }
	});
});
app.post('/getEmails', function(req, res) {
	email.find({userID: req.body.id}, 
	function(err, emails) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (emails) {
            res.json(emails);
       	} 
        else {
            res.sendStatus(403);
        }
	});
});






















