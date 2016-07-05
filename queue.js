var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var bodyParser = require('body-parser');
var utilities = require('./server/utilities');
var reminder = require('./server/models/reminder');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));



var portNumber = 7999
var server = app.listen(portNumber, function() {
console.log("Started on port " + portNumber);
var host = server.address().address;
var port = server.address().port;
});


function checkReminders() {
	reminder.find({}, function(err, reminders, created) {
		for(var i = 0; i < reminders.length; i++){
			if(reminders[i].timeToSend != null) {
				if(reminders[i].timeToSend.getTime() < new Date().getTime()){
					sendReminder(reminders[i]);
					break;
				}
			}
		}
	});
	
}
function sendReminder(reminderObj){
	utilities.sendReminder(reminderObj);
	reminder.remove({_id: reminderObj._id},function(err, tempReminder){}); 
	
}
setInterval(checkReminders, 10000);
