var path = require('path'),
    fs = require('fs'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'parkave'
    },
    port: 3000,
    env: env,
    cred: {
        // Specify the key file for the server
        key: fs.readFileSync(__dirname +'/server.key'),

        // Specify the certificate file
        cert: fs.readFileSync(__dirname +'/server.crt'),

        // Specify the Certificate Authority certificate
        // ca: fs.readFileSync('ssl/ca/ca.crt'),

        // This is where the magic happens in Node.  All previous
        // steps simply setup SSL (except the CA).  By requesting
        // the client provide a certificate, we are essentially
        // authenticating the user.
        requestCert: false,

        // If specified as "true", no unauthenticated traffic
        // will make it to the route specified.
        rejectUnauthorized: false
    },
    db: 'mongodb://localhost/parkave-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'parkave'
    },
    port: 3000,
    env: env,
    cred: {
      key: fs.readFileSync(__dirname +'/server.key'),
      cert: fs.readFileSync(__dirname +'/server.crt')
    },
    db: 'mongodb://localhost/parkave-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'parkave'
    },
    port: 3000,
    env: env,
    cred: {
      key: fs.readFileSync(__dirname +'/server.key'),
      cert: fs.readFileSync(__dirname +'/server.crt')
    },
    db: 'mongodb://localhost/parkave-production'
  }
};

module.exports = config[env];

