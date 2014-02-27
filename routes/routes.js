var path = require('path'),
    usersController = require('./../controllers/users');

// Require your controllers here
// Example: var postsController = require('./../controllers/posts.js');  
var lotsController = require('./../controllers/lots.js');
var spotsController = require('./../controllers/spots.js');
var reviewsController = require('./../controllers/reviews.js');
var carsController = require('./../controllers/cars.js');
function sendIndexFile(res){
  res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
}

module.exports = {
  init: function(app) {
    app.get('/heartbeat', function(req, res) {
      res.send("it's alive! it's alive!!")
    });

    // API Routes go here
    app.get(  '/api', function(req, res){ res.send("working"); });
    
    app.get(  '/api/users',     usersController.index);     // get all users
    app.get(  '/api/users/:uid', usersController.show);     // get the user with the given id
    app.post( '/api/users',     usersController.create);    // create a user
    app.put(  '/api/users/:uid', usersController.update);   // update the user for the given id
    app.del(  '/api/users/:uid', usersController.destroy);  // delete the user with id <:uid> from the database

    app.post( '/api/users/session', usersController.session);  // used to validate email/password combinations -- give it an email and password

    //reviews
    app.get(  '/api/users/:uid/reviews', reviewsController.index);           // get all reviews for the user the given id
    app.get(  '/api/users/:uid/reviews/:rid', reviewsController.show);       // get a specific review for the given user and review ids 
    app.post( '/api/users/:uid/reviews', reviewsController.create);          // create a review in the database for the user with the given uid
    app.put(  '/api/users/:uid/reviews/:rid', reviewsController.update);     // update the specific review for the given user and review ids
    app.del(  '/api/users/:uid/reviews/:rid', reviewsController.destroy);    // delete the specific review for the given user and review ids

    //cars
    app.get(  '/api/users/:uid/cars', carsController.index);          // get all cars for a given user id
    app.get(  '/api/users/:uid/cars/:cid', carsController.show);      // get a specific car for the given user and car ids 
    app.post( '/api/users/:uid/cars', carsController.create);         // create a car in the database for the user with the given uid
    app.put(  '/api/users/:uid/cars/:cid', carsController.update);    // update the specific car for the given user and car ids
    app.del(  '/api/users/:uid/cars/:cid', carsController.destroy);   // delete the specific car for the given user and car ids

    // Lots
    app.get(  '/api/users/:uid/lots',     lotsController.index);        // Get all of the lots for a specified user id
    app.get(  '/api/users/:uid/lots/:lid', lotsController.show);        // Get a specific lot for a specified user id
    app.post( '/api/users/:uid/lots',     lotsController.create);       // create a lot in the databasefor a specified user id
    app.put(  '/api/users/:uid/lots/:lid', lotsController.update);      // Update the specific lot for a specified user id and lot id
    app.del(  '/api/users/:uid/lots/:lid', lotsController.destroy);     // Delete the specific lot for a specified user id and lot id

    // Spots
    app.get(  '/api/users/:uid/lots/:lid/spots', spotsController.index);
    app.get(  '/api/users/:uid/lots/:lid/spots/:sid', spotsController.show);
    app.post( '/api/users/:uid/lots/:lid/spots', spotsController.create);
    app.put(  '/api/users/:uid/lots/:lid/spots/:sid', spotsController.update);
    app.del(  '/api/users/:uid/lots/:lid/spots/:sid', spotsController.destroy);

    // Non-API routes

    app.get(  '/landing*', function(req, res) {
      sendIndexFile(res);
    });
    app.get(  '/users*', function(req, res) {
      sendIndexFile(res);
    });
    app.get(  '/getstarted*', function(req, res) {
      sendIndexFile(res);
    });
    app.get(  '/lots*', function(req, res) {
      res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
    });

  }
};
