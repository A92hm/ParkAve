
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var schema = mongoose.Schema({
  user_id: {type: ObjectId, require:true},
  title: {type: String, require: true, trim: true},
  date: Date,
  buyer_list: [String],
  numSpots: Number,
  blocked: Boolean,
  size: String,
  price: Number,
  surface: String,
  event_id: ObjectId,
  lot_id: {type: ObjectId, require:true}
});


var Spot = mongoose.model('spots', schema);

module.exports = {
  Spot: Spot
};
