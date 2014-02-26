var Car = require('./../models/car').Car;

module.exports = {
  index: function(req, res) {
    console.log('car index');
    Review.find({ownerID: req.params.uid}, function(err, reviews) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(reviews);
      }
    });
  },
  show: function(req, res) {
    console.log('car show');
    Review.findById(req.params.cid, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  create: function(req, res) {
    console.log('car create', req.params, req.body);
    Review.create(req.body, function(err, review) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(review);
      }
    });
  },
  update: function(req, res) {
    console.log('car update', req.params, req.body);
    res.status(500).json({err: 'unimplemented'});
  },
  destroy: function(req, res) {
    console.log('car destroy', req.params, req.body);
    Review.remove( {_id: req.params.cid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};