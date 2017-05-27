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

const getByUsername = async (username) => {
	return new Promise( async (resolve, reject) => {
		try {
			user.findOne({
				username
			}, (err, tempUser) => {
				if(err) {
					reject(err);
				} else {
					resolve(tempUser);
				}
			});
		} catch(error) {
			reject(error.toString());
		}
	});
};
const signup = async (username, password) => {
	return new Promise( async (resolve, reject) => {
		try {
			if(!password || password.trim().length === 0) {
				reject('empty password');
			}
			const tempUser = await getByUsername(username);
			if(tempUser) {
				reject('username taken')
			}
			user.findOrCreate({
				username,
				password: user.hashPassword(password),
				receiverEmail: '',
				senderEmail: '',
				senderPassword: ''
			}, (err, tempUser, created) => {
				if(created) {
					const token = user.generateToken(tempUser.username, tempUser._id);
					resolve(token);
				} else if(err || !created) {
					reject();
				}
			});
		} catch(error) {
			reject(error.toString());
		}
	});
};
module.exports = {
	getById,
	signup,
	login,
	update
};
