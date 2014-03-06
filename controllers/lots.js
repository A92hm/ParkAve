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
  // req.params.json should contain
  // lat+lng+dist
  nearlots: function(req,res) {
    console.log('near lots');
    var json = req.params.json.split('+');
    // Some error checking
    if (json.length != 3 || !isFinite(json[0]) || !isFinite(json[0]) || !isFinite(json[0])) {
      return res.status(500).json({err: 'Not all input numeric'});
    }
    // Defined as distance in miles / 7 miles
    var delta = json[2] / 7;
    var latitude = +json[0];
    var longitude = +json[1];
    Lot.find( {user_id: req.params.uid,
              lat: {$gte: (latitude - delta), $lte: (latitude + delta)},
              lon: {$gte: (longitude - delta), $lte: (longitude + delta)},
            },
      function(err, lots) {
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
      console.log('err', err);
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