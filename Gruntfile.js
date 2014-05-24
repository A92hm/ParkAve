'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);
  grunt.loadNpmTasks('grunt-contrib-sass');

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'app.js'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      sass: {
        files: ['assets/styles/**/*.sass'],
        tasks: ['sass']
      },
      js: {
        files: [
          'app.js',
          'app/**/*.js',
          'config/*.js'
        ],
        tasks: ['develop', 'delayed-livereload']
      },
      client: {
        files: [
          'assets/js/**/*.js'
        ],
        tasks: ['uglify'],
      },

      jade: {
        files: ['app/views/**/*.jade'],
        options: { livereload: reloadPort }
      }
    },

        // Hint Config
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        // 'Gruntfile.js',
        // 'assets/scripts/**/*.js',
        // 'server/**/*.js',
        // 'app.js',
        // '!assets/scripts/vendor/*',
        // 'test/spec/**/*.js'
      ]
    },

    uglify: {
    my_target: {
        files: [{
            expand: true,
            cwd: 'assets/js',
            src: '**/*.js',
            dest: 'public/js'
        }]
      }
    },
    // Sass Config
  sass: {
    dist: {
      files: [{
        expand: true,
        cwd: 'assets/styles',
        src: ['**/*.sass'],
        dest: 'public/styles',
        ext: '.css'
      }]
    }
  },

    // Imagemin Config
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/imgs',
          src: '**/*.{png,jpg,jpeg}',
          dest: 'public/imgs'
        }]
      }
    },

    // SVGmin Config
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'assets/imgs',
          src: '{,*/}*.svg',
          dest: 'public/imgs'
        }]
      }
    },

    // Open Config
    open: {
      site: {
        path: 'http://localhost:3000',
        app: 'Google Chrome'
      }
    }

  });

  grunt.config.requires('watch.js.files');
  files = grunt.config('watch.js.files');
  files = grunt.file.expand(files);

  // Live reload
  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function(err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded)
            grunt.log.ok('Delayed live reload successful.');
          else
            grunt.log.error('Unable to make a delayed live reload.');
          done(reloaded);
        });
    }, 500);
  });

  grunt.registerTask('default', ['develop','uglify', 'sass', 'imagemin','open:site','watch']);
  grunt.registerTask('build', ['uglify', 'sass', 'imagemin']);

};
