var Car = require('../models/car').Car;

module.exports = {
  index: function(req, res) {
    Car.find({user_id: req.params.uid}, function(err, cars) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(cars);
      }
    });
  },
  show: function(req, res) {
    Car.findById(req.params.cid, function(err, car) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(car);
      }
    });
  },
  create: function(req, res) {
    Car.create(req.body, function(err, car) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(car);
      }
    });
  },
  update: function(req, res) {
    var newCar = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id"){
        newCar[key] = value;
      }
    });

    Car.findByIdAndUpdate(req.params.cid, newCar, function(err){
      if(err){
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  },
  destroy: function(req, res) {
    Car.remove( {_id: req.params.cid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};