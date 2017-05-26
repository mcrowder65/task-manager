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
  username: {
    type: String,
    index: true,
    unique: true
  },
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
userSchema.methods.checkPassword = (password, userPassword) => {
  return bcrypt.compareSync(password, userPassword);
};

// Generate a token for a client
userSchema.statics.generateToken = (username, _id) => {
  return jwt.sign({
    username,
    _id
  }, SECRET);
};

// Verify the token from a client. Call the callback with a user object if successful or null otherwise.
userSchema.statics.verifyToken = async(token) => {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, SECRET, (err, decoded) => {
        try {
          if (err) {
            console.log('verifyToken err ', err)
            reject(err);
          } else {
            resolve(decoded);
          }
        } catch (error) {
          console.log('inner try/catch error ', error)
          reject(error);
        }
      });
    } catch (error) {
      console.log('outer try/catch error ', error);
      reject(error);
    }
  })
};

// add findOrCreate
userSchema.plugin(findOrCreate);

// create user
var user = mongoose.model('users', userSchema);

module.exports = user;
