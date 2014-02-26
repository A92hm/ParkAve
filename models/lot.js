
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  lot_id: String,
  title: {type: String, require: true, trim: true},
  address1: {type: String, require: true, trim: true},
  address2: {type: String, require: false, trim: true},
  city: String,
  zip: String,
  state: String,
  latitude: String,
  longitude: String
});

var Lot = mongoose.model('lots', schema);

module.exports = {
  Lot: Lot
};