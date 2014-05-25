// var mongoose = require('mongoose'),
//   Users = mongoose.model('users');



// module.exports = {
// 	login : function(req, res, next) {
// 	  passport.authenticate('local', function(err, user, info) {
// 	    if (err) { return next(err) }
// 	    if (!user) {
// 	      req.session.messages =  [info.message];
// 	      return res.redirect('/login')
// 	    }
// 	    req.logIn(user, function(err) {
// 	      if (err) { return next(err); }
// 	      return res.redirect('/');
// 	    });
// 	  })(req, res, next);
// 	},

// 	logout : function(req, res){
// 	  req.logout();
// 	  res.redirect('/');
// 	},






// }