
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  user_id: String,
  title: {type: String, require: true, trim: true},
  date: Date,
  buyer_list: [String],
  numSpots: Number,
  blocked: Boolean,
  size: String,
  price: Number,
  surface: String,
  event_id: String,
  lot_id: String
});


var Spot = mongoose.model('Spot', schema);

module.exports = {
  Spot: Spot
};
