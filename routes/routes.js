var path = require('path');

// Require your controllers here
// Example: var postsController = require('./../controllers/posts.js');  
var lotsController = require('./../controllers/lots.js');

module.exports = {
  init: function(app) {
    app.get('/heartbeat', function(req, res) {
      res.send("it's alive! it's alive!!")
    });

    // API Routes go here
    // Example
    // app.get(  '/api/posts',     postsController.index);
    // app.get(  '/api/posts/:id', postsController.show);
    // app.post( '/api/posts',     postsController.create);
    // app.put(  '/api/posts/:id', postsController.update);
    // app.del(  '/api/posts/:id', postsController.destroy);
    app.get('/api', function(req, res){
      res.send("working")
    });

    app.get(  '/landing*', function(req, res) {
      res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
    });
    app.get(  '/getstarted*', function(req, res) {
      res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
    });

    app.get(  '/api/lots',     lotsController.index);
    app.get(  '/api/lots/:id', lotsController.show);
    app.post( '/api/lots',     lotsController.create);
    app.put(  '/api/lots/:id', lotsController.update);
    app.del(  '/api/lots/:id', lotsController.destroy);

    app.get(  '/lots*', function(req, res) {
      res.sendfile(path.join(__dirname, '..', 'public', 'index.html'));
    });

  }
};
