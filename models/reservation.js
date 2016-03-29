var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var reservationSchema = new Schema({
	owner: {type: String, index: true},
	buyer: String,
	drivewayId: String,
	date: String,
	time: String
	
});

reservationSchema.plugin(findOrCreate);

var reservation = mongoose.model('reservations', reservationSchema);

module.exports = reservation;