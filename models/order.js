var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate')

var orderSchema = new Schema({
	email: {type: String, index: true},
	name1: String,
	last4: Number,
	address: String,
	city: String,
	cardType: String,
	state: String,
	zip: Number,
	price: Number,
	reservationDate: String,
	reservationDuration: Number,
	reservationTime: String,
	stripeTokenId: String
});

orderSchema.plugin(findOrCreate);

var order = mongoose.model('orders', orderSchema);

module.exports = order;