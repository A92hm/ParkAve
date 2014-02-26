
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {type: String, require: true, trim: true},
  address1: {type: String, require: true, trim: true},
  address2: {type: String, require: false, trim: true},
  city: String,
  zip: String,
  state: String,
  parkingSurface: String
});

var Lot = mongoose.model('lots', schema);

module.exports = {
  Lot: Lot
};
