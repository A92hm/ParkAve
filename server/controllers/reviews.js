var Review = require('../models/review').Review,
    User   = require('../models/user').User;

module.exports = {
  index: function(req, res) {
    Review.find({reviewee_id: req.params.uid}, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  show: function(req, res) {
    Review.findById(req.params.rid, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  create: function(req, res) {
    Review.create(req.body, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  showAll: function(req, res) {
    Review.find({}, function(err, reviews) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(reviews);
      }
    });
  },
  update: function(req, res) {
    var newReview = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id"){
        newReview[key] = value;
      }
    });

    Review.findByIdAndUpdate(req.params.rid, newReview, function(err){
      if(err){
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  },
  destroy: function(req, res) {
    Review.remove( {_id: req.params.rid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};