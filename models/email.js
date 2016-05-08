var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var emailSchema = new Schema({
    sendingEmail: String,
    sendingPassword: String,
    receivingEmail: String,
    timeToSend: String,
    emailBody: String
});

// add findOrCreate
emailSchema.plugin(findOrCreate);

// create user
var email = mongoose.model('emails', emailSchema);

module.exports = email;