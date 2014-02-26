var mongoose = require('mongoose');

var carSchema = mongoose.Schema({
	make: String,
	model: String,
	year: String,
	plate: {type: String, require: true},
	state: {type: String, require: true},
	color: String,
	ownerID: {type: String, require: true}
});

var Car = mongoose.model('Car', carSchema);

module.exports = {
  Car: Car
};
