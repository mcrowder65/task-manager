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
	signup: (req, res) => {
		user.findOrCreate({
			username: req.body.username,
			password: user.hashPassword(req.body.password),
			receiverEmail: '',
			senderEmail: '',
			senderPassword: ''
		}, (err, tempUser, created) => {
			if(created) {
				var token = user.generateToken(tempUser.username);
		        res.json({token: tempUser._id});
			} else if(!created) {
				res.sendStatus("403");
			}
		});
	},
	getSenderPassword: (req, res) => {
		user.findOne({_id: req.body.id},
		(err, tempUser) => {
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
	setSenderPassword: (req, res) => {
		user.update({_id: req.body._id}, {senderPassword: req.body.senderPassword},
		(err, user) => {
			if(user) {
				res.json(req.body.senderPassword);
			}
			else {
				res.sendStatus('403');
			}
		});
	},
	getSenderEmail: (req, res) => {
		user.findOne({_id: req.body.id},
		(err, tempUser) => {
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
	setSenderEmail: (req, res) => {
		if(!userValidator.validateSenderEmail(req.body.senderEmail)){
			res.sendStatus('403');
			return;
		}
		user.update({_id: req.body._id}, {senderEmail: req.body.senderEmail},
		(err, user) => {
			if(user) {
				res.json(req.body.senderEmail);
			}
			else {
				res.sendStatus('403');
			}
		});
	},
	login: (req, res) => {
		user.findOne({username: req.body.username},
		(err, tempUser) => {
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
	setReceiverEmail: (req, res) => {
		if(!userValidator.validateReceiverEmail(req.body.receiverEmail)) {
			res.sendStatus('403');
			return;
		}
		user.update({_id: req.body._id}, {receiverEmail: req.body.receiverEmail},
		(err, user) => {
			if(user)
				res.json(req.body.receiverEmail);
			else
				res.sendStatus('403');
		});
	}
};
