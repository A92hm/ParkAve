var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = mongoose.Schema({
  firstName: {type: String, require: true, trim: true},
  lastName: {type: String, require: true, trim: true},
  email: {type: String, require: true, trim: true},
  password: {type: String, require: true, trim: true},
  birthdate: {type: Date, require: true, trim: true},
  phone: {type: String, require: true, trim: true},
  reservedSpots: {type: [ObjectId], require: true},
  spotHistory: {type: [ObjectId], require: true},
});

var User = mongoose.model('users', userSchema);

module.exports = {
  User: User
};
