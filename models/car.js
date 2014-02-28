gvar mongoose = require('mongoose');

var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var carSchema = mongoose.Schema({
	make: String,
	model: String,
	year: String,
	plate: {type: String, require: true},
	state: {type: String, require: true},
	color: String,
	user_id: {type: ObjectId, require:true},
});

var Car = mongoose.model('cars', carSchema);

module.exports = {
  Car: Car
};
