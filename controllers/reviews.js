var Review = require('./../models/review').Review;

module.exports = {
  index: function(req, res) {
    console.log('review index');
    Review.find({revieweeID: req.params.uid}, function(err, reviews) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(reviews);
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
  update: function(req, res) {
    console.log('review update', req.params, req.body);
    res.status(500).json({err: 'unimplemented'});
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