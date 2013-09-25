module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            build: {
                src: 'assets/scripts/main.js',
                dest: 'assets/scripts/main.min.js'
            }
        },

        qunit: {
            all: ['test/**/*.html']
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'assets/sass',
                    cssDir: 'assets/css',
                    imagesDir: 'assets/images',
                    environment: 'development',
                    httpGeneratedImagesPath: 'assets/images'
                }
            }
        },

        watch: {
            build: {
                files: ['assets/scripts/main.js'],
                tasks: ['uglify'],

            },
            compass: {
                files: ['assets/sass/{,*/}*{,*/}*{,*/}*.{scss,sass}'],
                tasks: ['compass:dev']
            }
        }
    });


    // Required task(s)
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');

    // Default task(s)
    grunt.registerTask('default', ['uglify', 'compass']);
};