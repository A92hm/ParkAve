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
    cred: {
      key: fs.readFileSync(__dirname +'/server.key'),
      cert: fs.readFileSync(__dirname +'/server.crt')
    },
    db: 'mongodb://localhost/parkave-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'parkave'
    },
    port: 3000,
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
    cred: {
      key: fs.readFileSync(__dirname +'/server.key'),
      cert: fs.readFileSync(__dirname +'/server.crt')
    },
    db: 'mongodb://localhost/parkave-production'
  }
};

module.exports = config[env];

