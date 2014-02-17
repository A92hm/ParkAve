
var mongoose = require('mongoose');

var schema = mongoose.Schema({
  body: {type: String, require: true, trim: true},
  postid: {type: String, require: true, trim: true},
});

var Comment = mongoose.model('comments', schema);

module.exports = {
  Comment: Comment
};
