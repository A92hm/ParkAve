
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  title: {type: String, require: true, trim: true},
  date: { type: Date, default: Date.now },
  stars: {type: Number, min: 1, max: 5},
  sellerID: String,
  buyerID: String,
  body: String
});

var SellerReview = mongoose.model('SellerReview', schema);

module.exports = {
  SellerReview: SellerReview
};