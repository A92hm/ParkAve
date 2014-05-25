var mongoose = require('mongoose'),
	bcrypt = require('bcrypt'),
	SALT_WORK_FACTOR = 10;
exports.mongoose = mongoose;
 

var Schema = mongoose.Schema, 
	ObjectId = Schema.ObjectId;
// User Schema
var userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true}
});


// Bcrypt middleware
userSchema.pre('save', function(next) {
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if(err) return next(err);

		bcrypt.hash(user.password, salt, function(err, hash) {
			if(err) return next(err);
			user.password = hash;
			next();
		});
	});
});

// Password verification
userSchema.methods.comparePassword = function(candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if(err) return cb(err);
		cb(null, isMatch);
	});
};

// Export user model
// var userModel = mongoose.model('User', userSchema);
// exports.userModel = userModel;
// var usr = new userModel({ username: 'bob', email: 'bob@example.com', password: 'secret' });
// usr.save(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log('user: ' + usr.username + " saved.");
//   }
// });
