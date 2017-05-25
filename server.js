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

app.post('/getRemindersByDay', async (req, res) => {
  try {
    const reminders = await reminderDAO.getByDay(req.body.currentDay, req.body.id);
    console.log('reminders ', reminders);
    console.log('req.body.currentDay ', req.body.currentDay);
    res.json(reminders)
  } catch(error) {
    res.sendStatus(500);
  }
});

app.post('/getByUserId', async (req, res) => {
  try {
    //TODO once object spread is supported, change to object spread
    let user = await userDAO.getById(req.body._id);
    user.clientSecret = null;
    user.password = null;
    res.json(user);
  } catch(error) {
    res.sendStatus(500);
  }
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
app.post('/getReminders', async (req, res) => {
  try {
    const reminders = await reminderDAO.getReminders(req.body.id);
    res.json(reminders);
  } catch(error) {
    res.json(500);
  }
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
app.post('/setReceiverEmail', (req, res) => {
	userDAO.setReceiverEmail(req, res);
});
