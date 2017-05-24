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
var reminderDAO = require('./server/dao/reminderDAO.js');
var user = require('./server/models/user.js');
var userDAO = require('./server/dao/userDAO.js');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));

var portNumber = 80;
process.argv.forEach((val, index, array) => {
  if(val === '--port') {
    portNumber = array[index + 1];
  }
});

var server = app.listen(portNumber, () => {
	console.log("Started on port " + portNumber);
	var host = server.address().address;
	var port = server.address().port;
});

app.post('/sendReminderImmediately', (req, res) => {
	reminderDAO.sendReminderImmediately(req, res);
});
app.post('/getReminder', (req, res) => {
	reminderDAO.getReminder(req, res);
});
app.post('/deleteReminder', (req, res) => {
	reminderDAO.deleteReminder(req, res);
});
app.post('/newReminder', (req, res) => {
	reminderDAO.newReminder(req, res);
});
app.post('/setReminder', (req, res) => {
	reminderDAO.setReminder(req, res);
})
app.post('/getReminders', (req, res) => {
	reminderDAO.getReminders(req, res);
});
app.post('/signup', (req, res) => {
	userDAO.signup(req, res);
});
app.post('/getSenderPassword', (req, res) => {
	userDAO.getSenderPassword(req, res);
});
app.post('/setSenderPassword', (req, res) => {
	userDAO.setSenderPassword(req, res);
});
app.post('/getSenderEmail', (req, res) => {
	userDAO.getSenderEmail(req, res);
});
app.post('/setSenderEmail', (req, res) => {
	userDAO.setSenderEmail(req, res);
});
app.post('/login', (req, res) => {
	userDAO.login(req, res);
});
app.post('/getReceiverEmail', (req, res) => {
	userDAO.getReceiverEmail(req, res);
});
app.post('/setReceiverEmail', (req, res) => {
	userDAO.setReceiverEmail(req, res);
});
