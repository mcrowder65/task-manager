var user =  require('../models/user.js');
var userValidator = require('../validators/userValidator');
const getById = async (_id) => {
	return new Promise( async (resolve, reject) => {
		user.findOne({
			_id
		},
			(err, tempUser) => {
				if(err) {
					reject(err);
				} else {
					resolve(tempUser);
				}
			}
		)
	});

};
module.exports = {
	getById,
	signup: function(req, res) {
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
			} else if(!created) {
				res.sendStatus("403");
			}
		});
	},
	getSenderPassword: function(req, res) {
		user.findOne({_id: req.body.id},
		function(err, tempUser) {
			if (err) {
			    res.sendStatus(403);
			    return;
			}
	        if (tempUser) {
	            res.json({ senderPassword: tempUser.senderPassword});
	       	} else {
	            res.sendStatus(403);
	        }
		});
	},
	setSenderPassword: function(req, res) {
		user.update({_id: req.body._id}, {senderPassword: req.body.senderPassword},
		function(err, user) {
			if(user) {
				res.json(req.body.senderPassword);
			}
			else {
				res.sendStatus('403');
			}
		});
	},
	getSenderEmail: function(req, res) {
		user.findOne({_id: req.body.id},
		function(err, tempUser) {
			if (err) {
			    res.sendStatus(403);
			    return;
			}
	        if (tempUser) {
	            res.json({senderEmail: tempUser.senderEmail});
	       	}
	        else {
	            res.sendStatus(403);
	        }
		});
	},
	setSenderEmail: function(req, res) {
		if(!userValidator.validateSenderEmail(req.body.senderEmail)){
			res.sendStatus('403');
			return;
		}
		user.update({_id: req.body._id}, {senderEmail: req.body.senderEmail},
		function(err, user) {
			if(user) {
				res.json(req.body.senderEmail);
			}
			else {
				res.sendStatus('403');
			}
		});
	},
	login: function(req, res) {
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
	},
	getReceiverEmail: function(req, res) {
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
	},
	setReceiverEmail: function(req, res) {
		if(!userValidator.validateReceiverEmail(req.body.receiverEmail)) {
			res.sendStatus('403');
			return;
		}
		user.update({_id: req.body._id}, {receiverEmail: req.body.receiverEmail},
		function(err, user) {
			if(user)
				res.json(req.body.receiverEmail);
			else
				res.sendStatus('403');
		});
	}
};
