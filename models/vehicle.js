var mongoose = require('mongoose');

var vehicleSchema = mongoose.Schema({
  type: {type: String, require: true, trim: true},  // Sedan, Truck, SUV, Minivan, Van
  license: {type: String, require: true, trim: true},
  ownerId: {type: String, require: true, trim: true}
});

var Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = {
  Vehicle: Vehicle
};
