const express = require('express');
const app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var utilities = require('./server/utilities');
var reminder = require('./server/models/reminder');

const portNumber = 7999;
const server = app.listen(portNumber, () => {
  console.log("Started on port " + portNumber);
  const host = server.address().address;
  const port = server.address().port;
});

const io = require('socket.io')(server);

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
          for(var i = 0; i < reminders.length; i++) {
            reminder.remove({
              _id: reminders[i]._id
            }, (err, tempReminder) => {
            });
          }
          for(var i = 0; i < reminders.length; i++) {
            await utilities.sendReminder(reminders[i]);
            io.emit('remove-reminder', {
              _id: reminders[i]._id
            });
          }
          resolve();
        }
    	});
    } catch(error) {
      reject(error);
    }

  });
}


const check = async () => {
  try {
    await checkReminders();
  } catch(error) {
    console.error(error);
  }
}
const interval = 10000;
console.log('checking every ' + (interval / 1000) + ' seconds');
setInterval(check, interval);
