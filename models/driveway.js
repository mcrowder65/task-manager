var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var drivewaySchema = new Schema({
	username: {type: String, index: true},
	address: String,
	zip: String,
	city: String,
	state: String,
	numCars: Number,
	times: [],
	fee: Number,
	location: {lat: Number, lng: Number}
});

drivewaySchema.plugin(findOrCreate);

var driveway = mongoose.model('driveways', drivewaySchema);

module.exports = driveway;