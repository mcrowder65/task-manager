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

app.post('/getRemindersByDay', async(req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    const reminders = await reminderDAO.getByDay(req.body.currentDay, payload._id);
    res.status(200).json(reminders)
  } catch(error) {
    res.status(500).json(error.message);
  }
});

app.post('/getById', async(req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    let user = await userDAO.getById(payload._id);
    if(user) {
      user.clientSecret = null;
      user.password = null;
      res.status(200).json(user);
    } else {
      res.status(500).json('User by that id doesn\'t exist..');
    }
  } catch(error) {
    res.status(500).json(error.message);
  }
});

app.post('/setById', async(req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    const response = await userDAO.update(payload._id, req.body.user);
    res.status(200).json(response);
  } catch(error) {
    res.status(500).json(error.message);
  }
});
app.post('/sendReminderImmediately', async (req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    await reminderDAO.sendReminderImmediately(payload._id, req.body._id);
    res.status(200).json({});
  } catch(error) {
    res.status(500).json(error.message || error);
  }
});
app.post('/getReminder', async (req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    const reminderObject = await reminderDAO.getReminder(req.body._id, payload._id);
    res.status(200).json(reminderObject);
  } catch(error) {
    res.status(500).json(error.message || error);
  }
});
app.post('/deleteReminder', async (req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    await reminderDAO.deleteReminder(payload._id, req.body._id, true);
    res.status(200).json({});
  } catch(error) {
    res.status(500).json(error.message || error);
  }
});
app.post('/newReminder', async(req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    await reminderDAO.newReminder(payload._id, req.body);
    res.status(200).json({});
  } catch(error) {
    res.status(500).json(error.message || error);
  }
});
app.post('/setReminder', async (req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    await reminderDAO.setReminder(payload._id, req.body);
    res.status(200).json({});
  } catch(error) {
    res.status(500).json(error.message || error);
  }
})
app.post('/getReminders', async(req, res) => {
  try {
    const payload = await getUserJWT(req.body.token);
    const reminders = await reminderDAO.getReminders(payload._id);
    res.status(200).json(reminders);
  } catch(error) {
    res.status(500).json(error.message || error);
  }
});
app.post('/signup', async (req, res) => {
  try {
    const token = await userDAO.signup(req.body.username, req.body.password);
    res.status(200).json(token);
  } catch(error) {
    res.status(500).json(error.message || error);
  }
});
app.post('/login', async(req, res) => {
  try {
    const result = await userDAO.login(req.body);
    res.status(200).json(result);
  } catch(error) {
    res.status(403).json(error.message || error);
  }
});


const getUserJWT = async(jwt) => {
  try {
    if(!jwt) {
      throw new Error('No jwt provided');
    }
    const payload = await user.verifyToken(jwt);
    return payload;
  } catch(error) {
    console.log('jwt tampered ', error);
    throw new Error('jwt tampered')
  }
};
