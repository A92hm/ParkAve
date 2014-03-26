var _ = require('underscore'),
    Spot = require('./../models/spot').Spot,
    User = require('./../models/user').User;

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
  purchaseSpot: function(req, res) {
    console.log('buying spot');
    var content = req.body;
    Spot.update({_id: content.spot_id, $size: {buyer_list: { $lt: this.numSpots}}}, { $addToSet: {buyer_list: content.user_id} },
      function(err, spot) {
      if (err) {
        res.status(500).json({err: 'internal error', content: err});
      } else if (!spot) {
        res.status(500).json({response: "No spots available"});
      }
    });
    User.update({_id: content.user_id},{ $addToSet: {reservedSpots: content.spot_id, spotHistory: content.spot_id} },
      function(err, spot) {
        if (err) {
          res.status(500).json({err: 'internal error', content: err});
        } else if (!spot) {
          res.status(500).json({response: "No spots available"});
        } else {
          res.json({ response: "Success"});
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