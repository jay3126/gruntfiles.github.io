
module.exports = {
  options : {
    jshintrc : '.jshintrc'
  },
  main : {
    src : [ 'src/**/*.js', '!src/js/main.build.js']
  },
  gruntfile : {
    src : 'Gruntfile.js'
  },
  test : {
    src : 'test/**/*.js'
  }
}
