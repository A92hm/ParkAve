
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {type: String, require: true, trim: true},
  date: { type: Date, default: Date.now },
  stars: {type: Number, min: 1, max: 5, default: 0},
  reviewerID: {type: String, require:true},
  revieweeID: {type: String, require:true},
  body: {type: String, require:true},
  lotID: {type: String, default: "noid"}
});

var Review = mongoose.model('Review', schema);

module.exports = {
  Review: Review
};