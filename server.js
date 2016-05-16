var express = require('express');
var app = express();
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/list');
var api = require('./models/api.js');

app.use(express.static(__dirname + ''));
var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
        extended: true
}));


var portNumber = 8000
var server = app.listen(portNumber, function() {
console.log("Started on port " + portNumber);
var host = server.address().address;
var port = server.address().port;
});


/**************************************************
					SERVER RECEIVERS
***************************************************/

var email = require('./models/email.js');
app.post('/newEmail', function(req, res){
		email.findOrCreate({
		sendingEmail: req.body.sendingEmail,
		sendingPassword: req.body.sendingPassword,
		receivingEmail: req.body.receivingEmail,
		emailBody: req.body.emailBody,
		timeToSend: req.body.timeToSend,
		subject: req.body.subject,
		userID: req.body.userID
	}, function(err, email, created) {
		if (created) {
			res.json({});
		}
		else if(email)
			res.json({});
		else
			res.sendStatus("403");
	});
});
app.post('/setReceiverEmail', function(req, res) {
	console.log(req.body.receiverEmail);
	user.update({_id: req.body._id}, {receiverEmail: req.body.receiverEmail},
	function(err, user) {
		if(user)
			res.json(req.body.receiverEmail);
		else
			res.sendStatus('403');
	});
});
app.post('/getReceiverEmail', function(req, res) {
	user.findOne({_id: req.body.id}, 
	function(err, tempUser) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (tempUser) {
            res.json({email:tempUser.receiverEmail});
       	} 
        else {
            res.sendStatus(403);
        }
	});
});

var user = require('./models/user.js');
app.post('/signup', function(req, res) {
	user.findOrCreate({
		username: req.body.username,
		password: user.hashPassword(req.body.password),
		receiverEmail: '',
		senderEmail: '',
		senderPassword: ''
	}, function(err, tempUser, created) {
		if(created) {
			var token = user.generateToken(tempUser.username);
	        res.json({token: tempUser._id});
		}
		else if(!created){
			res.sendStatus("403");
		}
	});
});

app.post('/login', function(req, res) {
	user.findOne({username: req.body.username}, 
	function(err, tempUser) {
		if (err) {
		    res.sendStatus(403);
		    return;
		}
        if (tempUser && tempUser.checkPassword(req.body.password)) {
            var token = tempUser._id;
            res.json({token:token});
       	} 
        else {
            res.sendStatus(403);
        }
	});
});























