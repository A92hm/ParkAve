
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  spot_id: String,
  title: {type: String, require: true, trim: true},
  date: Date,
  buyer_id: [String],
  numSpots: String,
  price: Number,
  parkingSurface: String,
  event_id: String,
  lot_id: String
});

var Spot = mongoose.model('spots', schema);

module.exports = {
  Spot: Spot
};
