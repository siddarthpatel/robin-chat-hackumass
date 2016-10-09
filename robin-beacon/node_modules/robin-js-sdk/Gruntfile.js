'use strict';
/*global module:false*/

// Configure the grunt modules we want to use here
var gruntModules = [
  'grunt-contrib-nodeunit',
  'grunt-contrib-jshint',
  'grunt-contrib-copy',
  'grunt-contrib-clean',
  'grunt-mocha-test',
  'grunt-blanket',
  'grunt-jscs-checker',
  'grunt-contrib-compress',
  'grunt-browserify',
  'grunt-contrib-uglify'
];

module.exports = function(grunt) {

  // The `time-grunt` module provides a handy output of the run time of each
  // grunt task
  require('time-grunt')(grunt);

  // Load these necessary tasks
  gruntModules.forEach(function (gruntModule) {
    grunt.loadNpmTasks(gruntModule);
  });


  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: ['lib/<%= pkg.name %>.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      robin: {
        options: {
          drop_console: true,
          report: 'gzip'
        },
        files: {
          'dist/robin.browser.min.js': ['dist/robin.browser.js']
        }
      }
    },
    jshint: {
      src: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish')
        },
        src: ['Gruntfile.js', 'robin.js', 'lib/**/*.js'],
      },
      test: {
        options: {
          jshintrc: '.jshintrc-test',
          reporter: require('jshint-stylish'),
        },
        src: ['test/**/*.js']
      },
      postInstall: {
        options: {
          jshintrc: '.jshintrc',
          reporter: require('jshint-stylish'),
        },
        src: ['scripts/postInstall.js']
      }
    },
    browserify: {
      robin: {
        files: {
          'dist/robin.browser.js': ['robin.js']
        },
        options: {
          browserifyOptions: {
            basedir: '.'
          },
          bundleOptions: {
            standalone: 'Robin',
          }
        }
      },
      tests: {
        files: {
          'dist/robin.browser.tests.js': ['test/**/test*.js']
        },
        options: {
          browserifyOptions: {
            basedir: '.'
          }
        }
      },
    },
    compress: {
      robin: {
        files: {
          'dist/robin.browser.min.js.gzip': ['dist/robin.browser.min.js']
        },
        options: {
          mode: 'gzip',
          level: 9,
          pretty: true
        }
      }
    },
    jscs: {
      lib: {
        src: ['./robin.js', 'lib/**/*.js'],
        options: {
          config: '.jscs.json',
          reporter: 'console'
        }
      }
    },
    clean: {
      coverage: {
        src: ['coverage/']
      }
    },
    copy: {
      src: {
        src: ['robin.js', 'lib/**/*.js'],
        dest: 'coverage/'
      },
      test: {
        src: ['test/**/test*.js'],
        dest: 'coverage/'
      }
    },
    blanket: {
      coverage: {
        src: ['coverage/'],
        dest: 'coverage/'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          timeout: 1000
        },
        src: ['test/**/test*.js']
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          // use the quiet flag to suppress the mocha console output
          quiet: true,
          // specify a destination file to capture the mocha
          // output (the quiet option does not suppress this)
          captureFile: 'coverage/coverage.html'
        },
        src: ['coverage/test/**/test*.js']
      }
    },
  });

  // Default task.
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('style', ['jscs:lib']);
  grunt.registerTask('coverage', ['copy:src', 'blanket', 'copy:test', 'mochaTest:coverage']);
  grunt.registerTask('test', ['mochaTest:test']);
  grunt.registerTask('browser', ['browserify', 'uglify:robin']);
  grunt.registerTask('build', ['lint', 'test', 'browser']);

};
