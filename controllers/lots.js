var Lot = require('./../models/lot').Lot;

module.exports = {
  index: function(req, res) {
    console.log('lots index');
    Lot.find({}, function(err, lots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lots);
      }
    });
  },
  show: function(req, res) {
    console.log('lots index');
    Lot.findById(req.params.id, function(err, lot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lot);
      }
    });
  },
  create: function(req, res) {
    console.log('lots create', req.params, req.body);
    Lot.create(req.body, function(err, lot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lot);
      }
    });
  },
  update: function(req, res) {
    console.log('lots update', req.params, req.body);
    res.status(500).json({err: 'unimplemented'});
  },
  destroy: function(req, res) {
    console.log('lots destroy', req.params, req.body);
    Lot.remove( {_id: req.params.id}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};