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

var io = require('socket.io')(server);


io.sockets.on('connection', function(socket) {
  socket.on('message', (message) => {
    console.log('message ', message);
    socket.emit('new', {
      hello: 'world'
    });
  });
});
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
const interval = 5000;
console.log('checking every ' + (interval / 1000) + ' seconds');
setInterval(check, interval);
