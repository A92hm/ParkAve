var Review = require('./../models/sellerReview').SellerReview;

module.exports = {
  index: function(req, res) {
    console.log('seller review index');
    Review.find({sellerID: req.params.uid}, function(err, reviews) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(reviews);
      }
    });
  },
  show: function(req, res) {
    console.log('seller review index');
    Review.findById(req.params.rid, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  create: function(req, res) {
    console.log('seller review create', req.params, req.body);
    Review.create(req.body, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  update: function(req, res) {
    console.log('seller review update', req.params, req.body);
    res.status(500).json({err: 'unimplemented'});
  },
  destroy: function(req, res) {
    console.log('seller review destroy', req.params, req.body);
    Review.remove( {_id: req.params.id}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};