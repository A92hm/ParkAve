var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var feedbackSchema = mongoose.Schema({
  email: {type: String, trim: true},
  body: {type: String, require: true},
  userAgent: {type: String, require: true}
});

var Feedback = mongoose.model('feedback', feedbackSchema);

module.exports = {
  Feedback: Feedback
};
