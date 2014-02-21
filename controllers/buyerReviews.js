var Review = require('./../models/buyerReview').BuyerReview;

module.exports = {
  index: function(req, res) {
    console.log('buyer review index');
    Review.find({}, function(err, reviews) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(reviews);
      }
    });
  },
  show: function(req, res) {
    console.log('buyer review index');
    Review.findById(req.params.rid, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  create: function(req, res) {
    console.log('buyer review create', req.params, req.body);
    Review.create(req.body, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  update: function(req, res) {
    console.log('buyer review update', req.params, req.body);
    res.status(500).json({err: 'unimplemented'});
  },
  destroy: function(req, res) {
    console.log('buyer review destroy', req.params, req.body);
    Review.remove( {_id: req.params.rid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};