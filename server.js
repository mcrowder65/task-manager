var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
app.use(express.static(__dirname + ''));
var bodyParser = require('body-parser');
var userValidator = require('./server/validators/userValidator');
var reminderValidator = require('./server/validators/reminderValidator');
var utilities = require('./server/utilities');
var reminder = require('./server/models/reminder.js');
var user = require('./server/models/user.js');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));


var portNumber = 80;
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

//TODO move to reminderDao
app.post('/sendReminderImmediately', function(req, res) {

	reminder.findOrCreate({
		_id: req.body._id
	}, function(err, tempReminder, created) {
		if(tempReminder) {
			res.json({})
			utilities.sendReminder(tempReminder);
			reminder.remove({_id: tempReminder._id},function(err, temp){});
		}
		else
			res.sendStatus("403");
	});
});
//TODO move to reminderDao
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
//TODO move to reminderDao
app.post('/deleteReminder', function(req, res){
	reminder.remove({_id: req.body._id},
	function(err, tempReminder){
		if(tempReminder){
			res.json({})
		}
	});
	
});
//TODO move to reminderDao
app.post('/newReminder', function(req, res) {
	if(!reminderValidator.validateNewReminder(req.body)){
		res.sendStatus("403");
		return;
	}
		reminder.findOrCreate({
		senderEmail: req.body.senderEmail,
		senderPassword: req.body.senderPassword,
		receiverEmail: req.body.receiverEmail.replace(" ", ""),
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
//TODO move to reminderDao
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

//TODO move to reminderDao
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
//TODO move to userDao
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
//TODO move to userDao
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
//TODO move to userDao
app.post('/setSenderPassword', function(req, res) {
	user.update({_id: req.body._id}, {senderPassword: req.body.senderPassword},
	function(err, user) {
		if(user)
			res.json(req.body.senderPassword);
		else
			res.sendStatus('403');
	});
});
//TODO move to userDao
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
//TODO move to userDao
app.post('/setSenderEmail', function(req, res) {
	if(!userValidator.validateSenderEmail(req.body.senderEmail)){
		res.sendStatus('403');
		return;
	}
	user.update({_id: req.body._id}, {senderEmail: req.body.senderEmail},
	function(err, user) {
		if(user)
			res.json(req.body.senderEmail);
		else
			res.sendStatus('403');
	});
});
//TODO move to userDao
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

//TODO move to userDao
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
//TODO move to userDao
app.post('/setReceiverEmail', function(req, res) {
	if(!userValidator.validateReceiverEmail(req.body.receiverEmail)) {
		res.sendStatus('403');
		return;
	}

	user.update({_id: req.body._id}, {receiverEmail: req.body.receiverEmail},
	function(err, user) {
		if(user)
			res.json(req.body.receiverEmail);
		else
			res.sendStatus('403');
	});
});








