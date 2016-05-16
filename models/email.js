var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var emailSchema = new Schema({
    sendingEmail: String,
    sendingPassword: String,
    receiverEmail: String,
    timeToSend: Date,
    emailBody: String,
    subject: String,
    userID: String
});

// add findOrCreate
emailSchema.plugin(findOrCreate);

// create user
var email = mongoose.model('emails', emailSchema);

module.exports = email;