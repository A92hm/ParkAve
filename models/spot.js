
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {type: String, require: true, trim: true},
  date: Date,
  buyerId: [String],
  numSpots: String,
  price: Number,
  event_id: String,
  lot_id: String
});

var Spot = mongoose.model('spots', schema);

module.exports = {
  Spot: Spot
};
