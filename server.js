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
    res.json(reminders)
  } catch(error) {
    res.sendStatus(500);
  }
});

app.post('/getById', async (req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    let user = await userDAO.getById(payload._id);
    if(user) {
      user.clientSecret = null;
      user.password = null;
      res.json(user);
    } else {
      res.status(500).json('invalid user or something');
    }
  } catch(error) {
    res.status(500).json(error.message);
  }
});

app.post('/setById', async (req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    const response = await userDAO.update(payload._id, req.body.user);
    res.json(response);
  } catch(error) {
    res.status(500).json(error.message);
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
app.post('/setSenderPassword', (req, res) => {
	userDAO.setSenderPassword(req, res);
});
app.post('/setSenderEmail', (req, res) => {
	userDAO.setSenderEmail(req, res);
});
app.post('/login', async (req, res) => {
  try {
    const result = await userDAO.login(req.body);
    res.json(result);
  } catch(error) {
    res.status(403).json(error);
  }
});
app.post('/setReceiverEmail', async (req, res) => {
	userDAO.setReceiverEmail(req, res);
});


const getUserJWT = async (jwt) => {
  try {
    const payload = await user.verifyToken(jwt);
    return payload;
  } catch(error) {
    console.log('jwt tampered ', error);
    throw new Error('jwt tampered')
  }
};
