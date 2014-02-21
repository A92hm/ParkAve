var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {type: String, require: true, trim: true},
  date: { type: Date, default: Date.now },
  stars: {type: Number, min: 1, max: 5},
  sellerID: String,
  buyerID: String,
  body: String
});

var BuyerReview = mongoose.model('BuyerReview', schema);

module.exports = {
  BuyerReview: BuyerReview
};