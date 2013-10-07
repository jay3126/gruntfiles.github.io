
module.exports = {
  srcjs : {
    files : ['<%= jshint.main.src %>'],
    tasks : ['browserify', 'jshint:main', 'nodeunit']
  },
  testjs : {
    files : ['<%= jshint.test.src %>'],
    tasks : ['jshint:test', 'nodeunit']
  },
  sprites : {
    files : ['<%= montage.sprites.src %>'],
    tasks : ['montage']
  }
}
