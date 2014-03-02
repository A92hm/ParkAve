var Review = require('./../models/review').Review;

module.exports = {
  index: function(req, res) {
    console.log('review index: '+req.params.uid);
    Review.find({reviewee_id: req.params.uid}, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        console.log('Review: ' +review);
        res.json(review);
      }
    });
  },
  show: function(req, res) {
    console.log('review show');
    Review.findById(req.params.rid, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  create: function(req, res) {
    console.log('review create', req.params, req.body);
    Review.create(req.body, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  showAll: function(req, res) {
    console.log('review show all');
    Review.find({}, function(err, reviews) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(reviews);
      }
    });
  },
  update: function(req, res) {
    console.log('reviews update', req.params, req.body);

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
    console.log('review destroy', req.params, req.body);
    Review.remove( {_id: req.params.rid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};