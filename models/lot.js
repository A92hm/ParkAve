
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var schema = mongoose.Schema({
  user_id: {type: ObjectId, require:true},
  title: {type: String, require: true, trim: true},
  address: {
    address1: {type: String, require: true, trim: true},
    address2: {type: String, require: false, trim: true},
    city: String,
    zip: String,
    state: String
  },
  lat: Number,
  lon: Number
});

var Lot = mongoose.model('lots', schema);

module.exports = {
  Lot: Lot
};
