var reminder = require('../models/reminder.js');
var reminderValidator = require('../validators/reminderValidator.js');
var utilities = require('../utilities.js');
module.exports = {
	sendReminderImmediately: function(req, res) {
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
	},
	getReminder: function(req, res) {
		reminder.findOne({_id: req.body._id},
		function(err, tempReminder) {
	        if (tempReminder) {
	            res.json({data: tempReminder});
	       	} 
	        else if (err) {
	            res.sendStatus(403);
	        }
		});
	},
	deleteReminder: function(req, res) {
		console.log(req.body);
		reminder.remove({_id: req.body._id},
		function(err, tempReminder){
			if(tempReminder){
				console.log(tempReminder);
				res.json({})
			}
		});
	}, 
	newReminder: function(req, res) {
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
			timeOfDay: req.body.timeOfDay,
			hidden: false
		}, function(err, tempReminder, created) {
			if (created) {
				res.json({});
			}
			else if(tempReminder)
				res.json({});
			else
				res.sendStatus("403");
		});
	},
	setReminder: function(req, res) {
		reminder.update({_id: req.body._id}, {
			senderEmail: req.body.senderEmail,
			senderPassword: req.body.senderPassword,
			receiverEmail: req.body.receiverEmail,
			emailBody: req.body.emailBody,
			timeToSend: req.body.timeToSend,
			subject: req.body.subject,
			userID: req.body.userID,
			dateToSend: req.body.dateToSend,
			timeOfDay: req.body.timeOfDay,
			hidden: false
		},
		function(err, tempReminder) {
			if(tempReminder)
				res.json(req.body.receiverEmail);
			else
				res.sendStatus('403');
		});
	},
	getReminders: function(req, res) {
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
	}
};