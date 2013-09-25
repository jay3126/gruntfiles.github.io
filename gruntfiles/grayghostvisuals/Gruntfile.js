//////////////////////////////////////////////////////////////////////////////////
/*
.|'''''|                            ||    
|| .                                ||    
|| |''|| '||''| '||  ||` `||''|,  ''||''  
||    ||  ||     ||  ||   ||  ||    ||    
`|....|' .||.    `|..'|. .||  ||.   `|..' The JavaScript Task Runner
*/
//////////////////////////////////////////////////////////////////////////////////
// Twitter: @gryghostvisuals | Github: grayghostvisuals
// PHP, Live Reload, Sass, Compass, Static Server
// JSHint, Use-Min, Rev, QUnit, Concat, Uglify

module.exports = function(grunt) {

	// Grunt Loaded Tasks
	// http://chrisawren.com/posts/Advanced-Grunt-tooling
	// ------------------------------------------------

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


	grunt.initConfig({

		// JSON Grunt Package
		// ------------------------------------------------

		pkg: grunt.file.readJSON('package.json'),

		// Grunt Meta Banner
		// ------------------------------------------------

		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n'
		},

		// Watch & Live Reload
		// ------------------------------------------------

		watch: {
			html: {
				files: ['*.html', '*.php', 'img/**/*.{png,jpg,jpeg,gif,webp,svg}']
			},
			sass: {
				files: ['scss/**/*.scss'],
				tasks: ['compass:dist']
			},
			css: {
				files: ['css/**/*.css']
			},
			js: {
				files: ['js/plugins.js','js/main.js'],
				tasks: ['concat']
			},
			livereload: {
				files: ['css/**/*.css', 'js/main.concat.js', '*.html', '*.php', 'img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
				options: { livereload: true }
			}
		},

		// Compass Config
		// ------------------------------------------------

		compass: {
			dist: {
				options: {
					config: 'config.rb'
				}
			}
		},

		// Run A Persistant Static Web Server
		// ------------------------------------------------

		connect: {
			server: {
				options: {
					port: 9001,
					// '.' operates from the root of your Gruntfile.js.
					// Otherwise you gotta do something like this...
					// Users/user-name/www-directory/website-directory/
					// For me it's this...
					// Users/grayghostvisuals/Sites/html5-boilerplate/
					base: '.',
					keepalive: true
				}
			}
		},

		// image optimization
		// http://integralist.co.uk/Grunt-Boilerplate.html
		// ------------------------------------------------

		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [
					{
						expand: true,
						cwd: 'img/',
						src: ['**/*.png'],
						dest: 'img/',
						ext: '.png'
					}
				]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [
					{
						expand: true,
						cwd: 'img/',
						src: ['**/*.jpg'],
						dest: 'img/',
						ext: '.jpg'
					}
				]
			}
		},

		// qunit Tests
		// ------------------------------------------------

		qunit: {
			// grunt qunit will test all .php file extensions
			all: ['*.html', '*.php']
		},

		// Concatenation
		// ------------------------------------------------

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['js/plugins.js','js/main.js'],
				dest: 'js/main.concat.js'
			}
		},

		// JSHinting
		// ------------------------------------------------

		jshint: {
			files: ['js/main.js'],
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true,
					require: true,
					define: true,
					requirejs: true,
					describe: true,
					expect: true,
					it: true
				}
			},
			uses_defaults: ['js/main.js']
		},

		// Uglify/Minification
		// ------------------------------------------------

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				src: ['js/main.concat.js'],
				dest: 'js/minified/main.min.js'
			}
		},

		// grunt-usemin
		// https://github.com/yeoman/grunt-usemin
		// ------------------------------------------------

		// Changes files to suit
		useminPrepare: {
			html: 'index.html',
			dest: 'dist'
		},

		usemin: {
			html: ['**/*.html'],
			css: ['**/*.css'],
			options: {
				dirs: ['dist'],
				basedir: '/'
			}
		},

		// file rev
		// ------------------------------------------------
		rev: {
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				length: 8
			},

			assets: {
				files: [{
					src: [
						// 'img/**/*.{jpg,jpeg,gif,png}',
						// 'fonts/**/*.{eot,svg,ttf,woff}'
						'css/main.css',
						'js/main-min.js'
					]
				}]
			}
		},
	});

	// Registered Grunt Tasks
	// ------------------------------------------------

	// Watch & Live Reload
	grunt.registerTask('default', ['watch']);

	// Unit Tests
	grunt.registerTask('test', ['qunit']);

	// JSHint
	grunt.registerTask('hint', ['jshint']);

	// Concat & Minify JS
	grunt.registerTask('con', ['concat']);
	grunt.registerTask('min', ['uglify']);

	// Optimize Images
	grunt.registerTask('imgopt', ['imagemin']);
	grunt.registerTask('optpng', ['imagemin:png']);
	grunt.registerTask('optjpg', ['imagemin:jpg']);

	// Build
	grunt.registerTask('build', ['useminPrepare', 'usemin']);
};