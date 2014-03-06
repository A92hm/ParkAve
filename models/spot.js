
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var schema = mongoose.Schema({
  user_id: {type: ObjectId, require: true},
  lot_id: {type: ObjectId, require: true},
  title: {type: String, require: true, trim: true},
  numSpots: {type: Number, require: true},
  price: {type: Number, require: true},
  date: Date,
  surface: String,
  event_id: ObjectId,
  blocked: Boolean,
  size: String,
  buyer_list: [Schema.ObjectId]
});


var Spot = mongoose.model('spots', schema);

module.exports = {
  Spot: Spot
};
