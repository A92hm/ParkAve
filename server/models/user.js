var mongoose = require('mongoose');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var userSchema = mongoose.Schema({
  firstName: {type: String, require: true, trim: true},
  lastName: {type: String, require: true, trim: true},
  email: {type: String, require: true, trim: true},
  password: {type: String, require: true, trim: true},
  birthdate: {type: String, require: false, trim: true},
  phone: {type: String, require: false, trim: true},
  userImage : {type: String, require: false, trim: true},
  reservedSpots: {type: [ObjectId], require: true},
  spotHistory: {type: [ObjectId], require: true},
  //do not set these values
  averageRating: {type:Number, min: -1, max: 5, default:-1},
  creditCard: {type: String, require: false, trim: true, default:'alskdfjlksdajfkljkl'}
});

var User = mongoose.model('users', userSchema);

module.exports = {
  User: User
};
