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


/*****************************************************************************************************************************************************************************************
																					SERVER RECEIVERS
******************************************************************************************************************************************************************************************/


/**************************************************************************************************************************************
																					REMINDERS
**************************************************************************************************************************************/

var reminder = require('./models/email.js');
app.post('/sendReminderImmediately', function(req, res){
	reminder.findOrCreate({
		_id: req.body._id
	}, function(err, tempReminder, created) {
		if(tempReminder) {
			res.json({})
			var receiverEmails = tempReminder.receiverEmail.split(",");
			for(var i = 0; i < receiverEmails.length; i++){
				var transporter = nodemailer.createTransport({
					service: 'Gmail',
					auth: {
						user: tempReminder.senderEmail,
						pass: tempReminder.senderPassword
					}
				});

				var mailOptions = {
					from: tempReminder.senderEmail,
					to: receiverEmails[i],
					subject: tempReminder.subject,
					html: tempReminder.emailBody
				};
				transporter.sendMail(mailOptions);
			}
				reminder.remove({_id: tempReminder._id},function(err, temp){});
		}
		else
			res.sendStatus("403");
	});
});
app.post('/getReminder', function(req, res){
	reminder.findOne({_id: req.body._id},
	function(err, tempReminder) {
        if (tempReminder) {
            res.json({data: tempReminder});
       	} 
        else if (err) {
            res.sendStatus(403);
        }
	});
});
app.post('/deleteReminder', function(req, res){
	reminder.remove({_id: req.body._id},
	function(err, tempReminder){
		if(tempReminder){
			res.json({})
		}
	});
	
});

app.post('/newReminder', function(req, res) {
		reminder.findOrCreate({
		senderEmail: req.body.senderEmail,
		senderPassword: req.body.senderPassword,
		receiverEmail: req.body.receiverEmail,
		emailBody: req.body.emailBody,
		timeToSend: req.body.timeToSend,
		subject: req.body.subject,
		userID: req.body.userID,
		dateToSend: req.body.dateToSend,
		timeOfDay: req.body.timeOfDay
	}, function(err, tempReminder, created) {
		if (created) {
			res.json({});
		}
		else if(tempReminder)
			res.json({});
		else
			res.sendStatus("403");
	});
});
app.post('/setReminder', function(req, res){
	reminder.update({_id: req.body._id}, {
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
	function(err, tempReminder) {
		if(tempReminder)
			res.json(req.body.receiverEmail);
		else
			res.sendStatus('403');
	});
})


app.post('/getReminders', function(req, res) {
	reminder.find({userID: req.body.id}, 
	function(err, tempReminders) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (tempReminders) {
            res.json(tempReminders);
       	} 
        else {
            res.sendStatus(403);
        }
	});
});
/**************************************************************************************************************************************
																					USER STUFF
**************************************************************************************************************************************/
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








