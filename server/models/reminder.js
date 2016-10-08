var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var emailSchema = new Schema({
    senderEmail: String,
    senderPassword: String,
    receiverEmail: String,
    timeToSend: Date,
    emailBody: String,
    subject: String,
    userID: String,
    dateToSend: String,
    timeOfDay: String,
    hidden: Boolean
});
// add findOrCreate
emailSchema.plugin(findOrCreate);

// create user
var email = mongoose.model('emails', emailSchema);

module.exports = email;