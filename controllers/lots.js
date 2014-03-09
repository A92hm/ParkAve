var _ = require('underscore'),
    Lot = require('./../models/lot').Lot,
    Spot = require('./../models/spot').Spot;

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
    if (json.length != 3) {
      return res.status(500).json({err: 'Incorrect number of arguments'});
    } else if (!isFinite(json[0]) || !isFinite(json[0]) || !isFinite(json[0])) {
      return res.status(500).json({err: 'Not all input numeric'});
    }
    // Defined as distance in miles / 7 miles
    var delta = json[2] / 7 * 0.1;
    var latitude = +json[0];
    var longitude = +json[1];
    Lot.find( {lat: {$gte: (latitude - delta), $lte: (latitude + delta)},
              lon: {$gte: (longitude - delta), $lte: (longitude + delta)}
            },
      function(err, lots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        console.log(lots);
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
    Spot.find({lot_id: req.params.lid}, function(err, spots){
      _.each(spots, function(spot){
        Spot.remove({_id: spot._id}, function(err){
          console.log('err', err);
        });
      });
      Lot.remove({_id: req.params.lid}, function(err) {
        if (err) {
          res.status(500).json({err: 'internal error'});
        } else {
          res.json({msg:'success'});
        }
      });
    });
  }
};