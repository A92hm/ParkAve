module.exports = function(app, io){

	//home route
	var home = require('../app/controllers/home');
	app.get('/', home.index);




};
