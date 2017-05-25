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

const login = async (body) => {
	return new Promise( (resolve, reject) => {
		user.findOne({
			username: body.username
		}, (err, tempUser) => {
			try {
				if (err) {
					reject(err);
				} else {
					if (tempUser && tempUser.checkPassword(body.password, tempUser.password)) {
						const jwt = user.generateToken(tempUser.username, tempUser._id);
						resolve(jwt);
					} else {
						reject('incorrect password');
					}
				}
			} catch(error) {
				reject(error);
			}
		});
	});
}

const update = async (_id, newUser) => {
	return new Promise( (resolve, reject) => {
		user.update( {
			_id
		}, {
			username: newUser.username,
			receiverEmail: newUser.receiverEmail,
			senderEmail: newUser.senderEmail,
			senderPassword: newUser.senderPassword
		}, (err, newUser) => {
			if(err) {
				reject('Failed to update');
			} else {
				resolve('user updated');
			}
		});
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
	login,
	update,
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
