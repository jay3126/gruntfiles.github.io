
module.exports = {
  dist: {
    options: {
      archive: 'app.tar.gz',
      mode : 'tgz'
    },
    files: [
      { expand: true, cwd: 'dist/', src: ['**'], dest: '<%= pkg.name %>/' }
    ]
  }
}
