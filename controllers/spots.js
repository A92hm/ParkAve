var Spot = require('./../models/spot').Spot;

module.exports = {
  index: function(req, res) {
    console.log('spots index');
    Spot.find({user_id: req.params.uid}, function(err, spots) {
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
        res.status(500).json({err: 'internal error'});
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
        res.json({msg:'success'});
      }
    });
  },
  destroy: function(req, res) {
    console.log('spots destroy');
    Spot.remove( {_id: req.params.sid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};