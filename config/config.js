var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'parkave'
    },
    port: 3000,
    db: 'mongodb://localhost/parkave-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'parkave'
    },
    port: 3000,
    db: 'mongodb://localhost/parkave-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'parkave'
    },
    port: 3000,
    db: 'mongodb://localhost/parkave-production'
  }
};

module.exports = config[env];
