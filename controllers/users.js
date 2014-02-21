var User = require('./../models/user').User,
    _ = require('underscore');

module.exports = {
  index: function(req, res) {
    console.log('users index');
    User.find({}, function(err, users) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(users);
      }
    });
  },
  show: function(req, res) {
    console.log('users index');
    User.findById(req.params.uid, function(err, user) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(user);
      }
    });
  },
  create: function(req, res) {
    console.log('users create', req.params, req.body);
    User.create(req.body, function(err, user) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(user);
      }
    });
  },
  update: function(req, res) {
    console.log('users update', req.params, req.body);
    var newUser = {};
    _.each(req.body, function(value, key){
      if(key != "__v" && key != "_id"){
        newUser[key] = value;
      }
    });
    User.findByIdAndUpdate(req.params.uid, newUser, {}, function(err){
      if(err){
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  },
  destroy: function(req, res) {
    console.log('users destroy', req.params, req.body);
    User.remove( {_id: req.params.cid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};