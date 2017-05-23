var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var utilities = require('./server/utilities');
var reminder = require('./server/models/reminder');




const checkReminders = async () => {
  return new Promise( async (resolve, reject) => {
    try {
      reminder.find({}, async (err, reminders, created) => {
    		for(var i = 0; i < reminders.length; i++){
    			if(reminders[i].timeToSend != null) {
    				if(reminders[i].timeToSend.getTime() < new Date().getTime()){
    					await sendReminder(reminders[i]);
              resolve();
    					break;
    				}
    			}
    		}
    	});
    } catch(error) {
      reject(error);
    }

  });
}
const sendReminder = async (reminderObj) => {

  return new Promise( async (resolve, reject) => {
    try {
      await utilities.sendReminder(reminderObj);
      await removeReminder(reminderObj);
      resolve();
    } catch(error) {
      reject(error);
    }
  });

  async function removeReminder(reminderObj) {
    return new Promise( async (resolve, reject) => {
      reminder.remove({_id: reminderObj._id}, (err, tempReminder) => {
        if(err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }
}

try {
  let result = (async () => {
    await checkReminders();
  })();
  db.disconnect();
} catch(error) {
  console.error(error);
}
