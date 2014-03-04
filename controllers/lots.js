var Lot = require('./../models/lot').Lot;

module.exports = {
  index: function(req, res) {
    console.log('lots index');
    Lot.find({user_id: req.params.uid}, function(err, lots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lots);
      }
    });
  },
  show: function(req, res) {
    console.log('lots show');
    Lot.findById(req.params.lid, function(err, lot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lot);
      }
    });
  },
  showAllLots: function(req,res) {
    console.log('show all of the lots');
    Lot.find({}, function(err, lots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lots);
      }
    });
  },
  create: function(req, res) {
    console.log('lots create');
    Lot.create(req.body, function(err, lot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(lot);
      }
    });
  },
  update: function(req, res) {
    console.log('lots update');

    var newLot = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id"){
        newLot[key] = value;
      }
    });

    Lot.findByIdAndUpdate(req.params.lid, newLot, function(err){
      if(err){
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  },
  destroy: function(req, res) {
    console.log('lots destroy');
    Lot.remove( {_id: req.params.lid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};