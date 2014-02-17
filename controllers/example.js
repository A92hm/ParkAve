var Comment = require('./../models/comment').Comment;

module.exports = {
  index: function(req, res) {
    console.log('comments index');
    Comment.find({postid: req.params.pid}, function(err, comments) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(comments);
      }
    });
  },
  show: function(req, res) {
    console.log('comments index');
    Comment.findById(req.params.cid, function(err, comment) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(comment);
      }
    });
  },
  create: function(req, res) {
    console.log('comments create', req.params, req.body);
    Comment.create(req.body, function(err, comment) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(comment);
      }
    });
  },
  update: function(req, res) {
    console.log('comments update', req.params, req.body);
    res.status(500).json({err: 'unimplemented'});
  },
  destroy: function(req, res) {
    console.log('comments destroy', req.params, req.body);
    Comment.remove( {_id: req.params.cid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};