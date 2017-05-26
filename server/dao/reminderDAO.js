var reminder = require('../models/reminder.js');
var reminderValidator = require('../validators/reminderValidator.js');
var utilities = require('../utilities.js');
var googlecalendar = require('../googlecalendar/googlecalendar.js');
var constants = require('../constants.js');

const newReminder = async(userID, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!reminderValidator.validateNewReminder(body)) {
        reject('Reminder format not valid');
      }
      const eid = await googlecalendar.createOrUpdate(body.subject, body.timeToSend, body.emailBody, null, userID);
      reminder.findOrCreate({
        senderEmail: body.senderEmail,
        senderPassword: body.senderPassword,
        receiverEmail: body.receiverEmail.replace(" ", ""),
        emailBody: body.emailBody,
        timeToSend: body.timeToSend,
        subject: body.subject,
        userID,
        dateToSend: body.dateToSend,
        milliseconds: new Date(body.timeToSend).getTime(),
        timeOfDay: body.timeOfDay,
        hidden: false,
        eid
      }, (err, tempReminder, created) => {
        if(created || tempReminder) {
          resolve();
        } else {
          reject('Error while creating')
        }
      });
    } catch(error) {
      reject(error.toString());
    }
  });
}

const getReminder = (req, res) => {
  reminder.findOne({
      _id: req.body._id
    },
    (err, tempReminder) => {
      if(tempReminder) {
        res.json(tempReminder);
      } else if(err) {
        res.sendStatus(403);
      }
    });
};
const sendReminderImmediately = (req, res) => {
  reminder.findOrCreate({
    _id: req.body._id
  }, (err, tempReminder, created) => {
    if(tempReminder) {
      res.json({})
      utilities.sendReminder(tempReminder);
      reminder.remove({
        _id: tempReminder._id
      }, (err, temp) => {});
    } else
      res.sendStatus("403");
  });
};

const deleteReminder = async(req, res) => {
  const reminderObject = await getById(req.body._id);
  googlecalendar.remove(reminderObject.eid, reminderObject.userID);
  reminder.remove({
    _id: req.body._id
  }, (err, tempReminder) => {
    if(tempReminder) {
      res.json({})
    }
  });
};

const setReminder = async (userID, body) => {
	return new Promise( async (resolve, reject) => {
		try {
			const reminderObject = await getById(body._id);
			if(reminderObject.userID !== userID) {
				reject('User doesn\'t own this reminder');
			}
			const eid = await googlecalendar.createOrUpdate(body.subject, body.timeToSend, body.emailBody, reminderObject.eid, userID);
			reminder.update({
				_id: body._id
			}, {
				senderEmail: body.senderEmail,
				senderPassword: body.senderPassword,
				receiverEmail: body.receiverEmail,
				emailBody: body.emailBody,
				timeToSend: body.timeToSend,
				subject: body.subject,
				userID,
				milliseconds: new Date(body.timeToSend).getTime(),
				dateToSend: body.dateToSend,
				timeOfDay: body.timeOfDay,
				hidden: false,
				eid: reminderObject.eid
			}, (err, tempReminder) => {
				if(tempReminder) {
					resolve();
				} else {
					reject('Something went wrong');
				}
			});
		} catch(error) {
			reject(error.toString());
		}
	});
};
const getReminders = async(userID) => {
  return new Promise((resolve, reject) => {
    reminder.find({
      userID
    }, (err, tempReminders) => {
      if(err) {
        reject(err);
        return;
      } else {
        resolve(tempReminders);
      }
    });
  });
};

const getById = (_id) => {
  return new Promise((resolve, reject) => {
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

const getByDay = async(day, userID) => {
  return new Promise((resolve, reject) => {
    try {
      const zeroHours = new Date(day).setHours(0, 0, 0, 0);
      const dayLater = new Date(day).setHours(24, 0, 0, -1);
      const reminders = reminder.find({
        milliseconds: {
          $gt: zeroHours,
          $lt: dayLater
        },
        userID
      }, async(err, reminders) => {
        if(err) {
          reject(err);
        } else {
          resolve(reminders);
        }
      })
    } catch(error) {
      reject(error);
    }
  });
}
module.exports = {
  sendReminderImmediately,
  getReminder,
  deleteReminder,
  newReminder,
  setReminder,
  getReminders,
  getById,
  getByDay
};
