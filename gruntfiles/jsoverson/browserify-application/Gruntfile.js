'use strict';

var fs = require('fs'),
path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var config = loadConfig('.grunt/config');

  config.pkg = grunt.file.readJSON('./package.json');

  grunt.initConfig(config);

  grunt.registerTask('test', [
    'jshint',
    'nodeunit'
  ]);

  grunt.registerTask('build', [
    'sass',
    'montage',
    'browserify'
  ]);

  grunt.registerTask('artifact', [
    'compress'
  ]);

  grunt.registerTask('dev', [
    'env:dev',
    'clean:dist',
    'test',
    'build',
    'watch'
  ]);

  grunt.registerTask('dist-build', [
    'env:build',
    'test',
    'build',
    'copy',
    'uglify',
    'preprocess',
    'artifact'
  ]);

  grunt.registerTask('default', [
    'dev'
  ]);
};

function loadConfig(configDir) {
  var config = {};

  fs.readdirSync(configDir).forEach(function(taskConfig){
    var taskName = taskConfig.replace(/\.js$/,'');
    config[taskName] = require('./' + path.join(configDir, taskName));
  });

  return config;
}
