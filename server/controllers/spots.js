var _ = require('underscore'),
    PaypalAPI = require('paypal-rest-sdk'),
    Spot = require('../models/spot').Spot,
    User = require('../models/user').User;

// PaypalAPI.configure({
//   'host': 'api.sandbox.paypal.com',
//   'port': '',
//   'client_id': 'AcVVohATeJpvJ2b1aMnmDAw_bg1EUceJrQGBE4Nt9xMA4_H8g-Gh5DQgLCjf',
//   'client_secret': 'EMgF2BASIuBwRttrHi09qc8VwFFJqdoO5eTy6o8ziAfsKsBF1HljBSazJd4F'
// });

var config_opts = {
    'host': 'api.sandbox.paypal.com',
    'port': '',
    'client_id': 'EBWKjlELKMYqRNQ6sYvFo64FtaRLRR5BdHEESmha49TM',
    'client_secret': 'EO422dn3gQLgDbuwqTjzrFgFtaRLRR5BdHEESmha49TM'
};

module.exports = {
  index: function(req, res) {
    console.log('spots index');
    Spot.find({lot_id: req.params.lid}, function(err, spots) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(spots);
      }
    });
  },
  show: function(req, res) {
    console.log('spots show');
    Spot.findById(req.params.sid, function(err, spot) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(spot);
      }
    });
  },
  create: function(req, res) {
    console.log('spots create');
    Spot.create(req.body, function(err, spot) {
      if (err) {
        res.status(500).json({err: 'internal error', content: err});
      } else if (req.body.numSpots < 0) {
        res.status(500).json({err: 'Cannot add a negative number of spots', content: err});
      } else {
       res.json(spot);
      }
    });
  },
  update: function(req, res) {
    console.log('spots update');
    var newSpot = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id"){
        newSpot[key] = value;
      }
    });
    Spot.findByIdAndUpdate(req.params.sid, newSpot, function(err){
      if(err){
        res.status(500).json({err: 'internal error'});
      } else {
        newSpot['_id'] = req.params.sid;
        res.json({msg:'success'});
      }
    });   
  },
  destroy: function(req, res) {
    console.log('spots destroy');

    //destroy spot
    Spot.remove( {_id: req.params.sid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};