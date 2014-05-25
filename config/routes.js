var passport = require('passport')
	, LocalStrategy = require('passport-local').Strategy
	, home = require('../app/controllers/home')
	// , user = require('../app/controllers/users')
	, session = require('../app/controllers/session');


module.exports = function(app, io){

	var user = require('../app/controllers/users')(io);

	app.get('/', home.index);
	app.get('/test', user.test);

	app.post('/login', session.postlogin);

	app.get('/logout', session.logout);

};
