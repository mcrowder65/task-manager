// setup Mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

// setup bcrypt
var bcrypt = require('bcryptjs');
var SALT = bcrypt.genSaltSync();

// setup json web token
var jwt = require('jsonwebtoken');
var SECRET = '\x1f\x1e1\x8a\x8djO\x9e\xe4\xcb\x9d`\x13\x02\xfb+\xbb\x89q"F\x8a\xe0a';

// User info, with items owned by that user
var userSchema = new Schema({
    username: {type: String, index: true, unique: true},
    receiverEmail: String,
    senderEmail: String,
    senderPassword: String,
    password: String,
    clientSecret: String
});

// hash the password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, SALT);
};

// check the password
userSchema.methods.checkPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
};

// Generate a token for a client
userSchema.statics.generateToken = (username) => {
    return jwt.sign({ username: username }, SECRET);
};

// Verify the token from a client. Call the callback with a user object if successful or null otherwise.
userSchema.statics.verifyToken = (token,cb) => {
    if (!token) {
        cb(null);
        return;
    }
    // decrypt the token and verify that the encoded user id is valid
    jwt.verify(token, SECRET, (err, decoded) => {
        if (!decoded) {
            cb(null);
            return;
        }
        User.findOne({username: decoded.username}, (err,user) => {
	    if (err) {
		cb(null);
	    } else {
		cb(user);
	    }
	});
    });
};

// add findOrCreate
userSchema.plugin(findOrCreate);

// create user
var user = mongoose.model('users', userSchema);

module.exports = user;
