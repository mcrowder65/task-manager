var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var utilities = require('./server/utilities');
var reminder = require('./server/models/reminder');




const checkReminders = async () => {
  return new Promise( async (resolve, reject) => {
    try {
      reminder.find({
        milliseconds: {
          $lt: new Date().getTime()
        }
      }, async (err, reminders, created) => {
        if(err) {
          throw err;
        } else {
          for(var i = 0; i < reminders.length; i++){
      			await sendReminder(reminders[i]);
          }
          resolve();
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


const check = async () => {
  try {
    await checkReminders();
  } catch(error) {
    console.error(error);
  }
}

setInterval(check, 60000);
