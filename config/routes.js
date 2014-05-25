var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy;


module.exports = function(app, io){

	//home route
	var home = require('../app/controllers/home')
		, user = require('../app/controllers/users')
		, session = require('../app/controllers/session');


	app.get('/', home.index);




	// POST /login
	//   This is an alternative implementation that uses a custom callback to
	//   acheive the same functionality.
	app.post('/login', user.postlogin);

	app.get('/logout', user.logout);

};
