var Feedback = require('../models/feedback').Feedback;

module.exports = {
  index: function(req, res) {
    Feedback.find({user_id: req.params.uid}, function(err, feedbacks) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(feedbacks);
      }
    });
  },
  show: function(req, res) {
    Feedback.findById(req.params.cid, function(err, feedback) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(feedback);
      }
    });
  },
  create: function(req, res) {
    Feedback.create(req.body, function(err, feedback) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json(feedback);
      }
    });
  },
  update: function(req, res) {
  },
  destroy: function(req, res) {
    Feedback.remove( {_id: req.params.cid}, function(err) {
      if (err) {
        res.status(500).json({err: 'internal error'});
      } else {
        res.json({msg:'success'});
      }
    });
  }
};