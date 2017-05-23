var reminder = require('../models/reminder.js');
var reminderValidator = require('../validators/reminderValidator.js');
var utilities = require('../utilities.js');
var googlecalendar = require('../googlecalendar/googlecalendar.js');

const newReminder = async (req, res) => {
	if(!reminderValidator.validateNewReminder(req.body)){
		res.sendStatus("403");
		return;
	}
	const eid = await googlecalendar.createOrUpdate(req.body.subject, req.body.timeToSend, req.body.emailBody, null, req.body.userID);
	reminder.findOrCreate({
		senderEmail: req.body.senderEmail,
		senderPassword: req.body.senderPassword,
		receiverEmail: req.body.receiverEmail.replace(" ", ""),
		emailBody: req.body.emailBody,
		timeToSend: req.body.timeToSend,
		subject: req.body.subject,
		userID: req.body.userID,
		dateToSend: req.body.dateToSend,
		milliseconds: new Date(req.body.timeToSend).getTime(),
		timeOfDay: req.body.timeOfDay,
		hidden: false,
		eid
	}, function(err, tempReminder, created) {
		if (created) {
			res.json({});
		}
		else if(tempReminder)
			res.json({});
		else
			res.sendStatus("403");
	});
}

const getReminder = (req, res) => {
	reminder.findOne({_id: req.body._id},
	function(err, tempReminder) {
				if (tempReminder) {
						res.json({data: tempReminder});
				}
				else if (err) {
						res.sendStatus(403);
				}
	});
};
const sendReminderImmediately = (req, res) => {
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
};

const deleteReminder = async (req, res) => {
	const reminderObject = await getById(req.body._id);
	console.log('req.body ', req.body);
	console.log('reminderObject ', reminderObject);
	googlecalendar.remove(reminderObject.eid, reminderObject.userID);
	reminder.remove({_id: req.body._id},
	function(err, tempReminder){
		if(tempReminder){
			res.json({})
		}
	});
};

const setReminder = async (req, res) => {
	const reminderObject = await getById(req.body._id);
	const eid = await googlecalendar.createOrUpdate(req.body.subject, req.body.timeToSend, req.body.emailBody, reminderObject.eid, req.body.userID);
	reminder.update({_id: req.body._id}, {
		senderEmail: req.body.senderEmail,
		senderPassword: req.body.senderPassword,
		receiverEmail: req.body.receiverEmail,
		emailBody: req.body.emailBody,
		timeToSend: req.body.timeToSend,
		subject: req.body.subject,
		userID: req.body.userID,
		milliseconds: new Date(req.body.timeToSend).getTime(),
		dateToSend: req.body.dateToSend,
		timeOfDay: req.body.timeOfDay,
		hidden: false,
		eid: reminderObject.eid
	},
	function(err, tempReminder) {
		if(tempReminder)
			res.json(req.body.receiverEmail);
		else
			res.sendStatus('403');
	});
};
const getReminders = (req, res) => {
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
};

const getById = (_id) => {
	return new Promise( (resolve, reject) => {
		reminder.findOne({
			_id
		}, (err, tempReminder) => {
			if(err) {
				reject(err);
			} else {
				resolve(tempReminder);
			}
		});
	});
};
module.exports = {
	sendReminderImmediately,
	getReminder,
	deleteReminder,
	newReminder,
	setReminder,
	getReminders,
	getById
};
