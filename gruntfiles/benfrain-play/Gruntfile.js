module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			sass: {
				files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}'],
				tasks: ['sass:dist','autoprefixer']
			},
			livereload: {
				files: ['*.html', 'wp-content/themes/retlehs-roots-0e51e90/*.php', 'js/**/*.{js,json}', 'wp-content/themes/retlehs-roots-0e51e90/css/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
				options: {
					livereload: true
				}
			},
			uglify: {
				files: ['wp-content/themes/retlehs-roots-0e51e90/js/raw/*.js','wp-content/themes/retlehs-roots-0e51e90/js/lib/*.js'],
				tasks: ['uglify:my_target']
			}
		},
		sass: {
			require: 'sass-globbing',
			dist: {
				files: {
					'wp-content/themes/retlehs-roots-0e51e90/css/styleUP.css': 'sass/style.scss'
				}
			}
		},
		uglify: {
			my_target: {
				files: {
					'wp-content/themes/retlehs-roots-0e51e90/js/script.min.js': ['wp-content/themes/retlehs-roots-0e51e90/js/raw/script.js'],
					'wp-content/themes/retlehs-roots-0e51e90/js/plugins.min.js': ['wp-content/themes/retlehs-roots-0e51e90/js/raw/plugins.js']
				}
			}
		},
		autoprefixer: {
			standard: {
				options: {
					browsers: ['last 2 version']
				},
				src: 'wp-content/themes/retlehs-roots-0e51e90/css/styleUP.css',
				dest: 'wp-content/themes/retlehs-roots-0e51e90/css/style.css'
			}
		}
	});
	grunt.registerTask('default', ['watch','uglify','autoprefixer']);
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
};
