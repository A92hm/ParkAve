var User = require('./../models/user').User;

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
    res.status(500).json({err: 'unimplemented'});
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