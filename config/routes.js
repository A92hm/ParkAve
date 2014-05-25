module.exports = function(app, io){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);


	// app.get('/', function(req, res){
	//   res.render('index', { user: req.user });
	// });

	app.get('/account', ensureAuthenticated, function(req, res){
	  res.render('account', { user: req.user });
	});

	app.get('/login', function(req, res){
	  res.render('login', { user: req.user, message: req.session.messages });
	});

	// POST /login
	//   This is an alternative implementation that uses a custom callback to
	//   acheive the same functionality.
	app.post('/login', function(req, res, next) {
	  passport.authenticate('local', function(err, user, info) {
	    if (err) { return next(err) }
	    if (!user) {
	      req.session.messages =  [info.message];
	      return res.redirect('/login')
	    }
	    req.logIn(user, function(err) {
	      if (err) { return next(err); }
	      return res.redirect('/');
	    });
	  })(req, res, next);
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	// Simple route middleware to ensure user is authenticated.
	//   Use this route middleware on any resource that needs to be protected.  If
	//   the request is authenticated (typically via a persistent login session),
	//   the request will proceed.  Otherwise, the user will be redirected to the
	//   login page.
	function ensureAuthenticated(req, res, next) {
	  if (req.isAuthenticated()) { return next(); }
	  res.redirect('/login')
	}

};
