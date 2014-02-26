var path = require('path'),
    usersController = require('./../controllers/users');

// Require your controllers here
// Example: var postsController = require('./../controllers/posts.js');  
var lotsController = require('./../controllers/lots.js');
var sellerReviewsController = require('./../controllers/sellerReviews.js');
var spotsController = require('./../controllers/spots.js');
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
    
    app.get(  '/api/users',     usersController.index);
    app.get(  '/api/users/:uid', usersController.show);
    app.post( '/api/users',     usersController.create);
    app.put(  '/api/users/:uid', usersController.update);
    app.del(  '/api/users/:uid', usersController.destroy);

    app.post( '/api/users/session', usersController.session);  // Used to validate email/password combinations

    app.get(  '/api/users/:uid/reviews', sellerReviewsController.index);
    app.get(  '/api/users/:uid/reviews/:rid', sellerReviewsController.show);
    app.post( '/api/users/:uid/reviews', sellerReviewsController.create);
    app.put(  '/api/users/:uid/reviews/:rid', sellerReviewsController.update);
    app.del(  '/api/users/:uid/reviews/:rid', sellerReviewsController.destroy);


    //cars
    app.get(  '/api/users/:uid/cars', carsController.index);
    app.get(  '/api/users/:uid/cars/:cid', carsController.show);
    app.post( '/api/users/:uid/cars', carsController.create);
    app.put(  '/api/users/:uid/cars/:cid', carsController.update);
    app.del(  '/api/users/:uid/cars/:cid', carsController.destroy);

    // Spots
    app.get(  '/api/users/:uid/lot/:lid/spots', spotsController.index);
    app.get(  '/api/users/:uid/lot/:lid/spots/:sid', spotsController.show);
    app.post( '/api/users/:uid/lot/:lid/spots', spotsController.create);
    app.put(  '/api/users/:uid/lot/:lid/spots/:rid', spotsController.update);
    app.put(  '/api/users/:uid/lot/:lid/spots/:rid', spotsController.destroy);

    // Lots
    app.get(  '/api/users/:uid/lots',     lotsController.index);
    app.get(  '/api/users/:uid/lots/:lid', lotsController.show);
    app.post( '/api/users/:uid/lots',     lotsController.create);
    app.put(  '/api/users/:uid/lots/:lid', lotsController.update);
    app.del(  '/api/users/:uid/lots/:lid', lotsController.destroy);

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
