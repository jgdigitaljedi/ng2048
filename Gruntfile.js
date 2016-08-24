// Grunt tasks

module.exports = function (grunt) {
	"use strict";

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
		'* <%= pkg.name %> - v<%= pkg.version %> - MIT LICENSE <%= grunt.template.today("yyyy-mm-dd") %>. \n' +
		'* @author <%= pkg.author %>\n' +
		'*/\n',

		clean: {
			dist: ['src']
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			app: {
				src: ['app/modules/**/*.js']
			}
		},

		exec: {
			bowerInstaller: 'bower-installer'
		},

		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: false
			},
			base: {
				src: [
					// Angular Project Dependencies,
					'app/app.js',
					'app/app.config.js',
					'app/modules/**/*Module.js',
					'app/modules/**/*Route.js',
					'app/modules/**/*Ctrl.js',
					'app/modules/**/*Service.js',
					'app/modules/**/*Directive.js'
				],
				dest: 'app/assets/js/<%= pkg.name %>-appbundle.js'
			},
			build: {
				src: [
					// Angular Project Dependencies,
					'app/assets/libs/angular/angular.js',
					'app/assets/libs/**/*.js'

				],
				dest: 'app/assets/js/<%= pkg.name %>-angularbundle.js'
			}
		},

		// uglify: {
		// 	options: {
		// 		banner: '<%= banner %>',
		// 		report: 'min'
		// 	},
		// 	base: {
		// 		src: ['<%= concat.base.dest %>'],
		// 		dest: 'app/assets/js/<%= pkg.name %>-angscript.min.js'
		// 	},
		// 	basePlugin: {
		// 		src: [ 'src/plugins/**/*.js' ],
		// 		dest: 'app/assets/js/plugins/',
		// 		expand: true,
		// 		flatten: true,
		// 		ext: '.min.js'
		// 	}
		// },

		connect: {
			server: {
				options: {
					keepalive: true,
					port: 4000,
					base: '.',
					hostname: 'localhost',
					debug: true,
					livereload: true,
					open: true
				}
			}
		},
		concurrent: {
			tasks: ['connect', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},

		watch: {
			app: {
				files: '<%= jshint.app.src %>',
				tasks: ['jshint:app'],
				options: {
					livereload: true
				}
			},
			styles: {
		        files: ['app/assets/less/*.less'],
		        tasks: ['less'],
		        options: {
		        	spawn: false,
		        	livereload: true
		        }
		    },
		    html: {
		    	files: ['app/modules/**/*.html'],
		    	options: {
		    		spawn: false,
		    		livereload: true
		    	}
		    },
		    utility: {
		    	files: ['Gruntfile.js', 'index.html'],
		    	options: {
		    		spawn: false,
		    		livereload: true
		    	}
		    }
		},

		less: {
		  	development: {
		    	options: {
		     	 	paths: ['app/assets/less/']
		    	},
		    	files: {
		      		'app/assets/css/result.css': 'app/assets/less/main.less'
		    	}
		  	},
		  	production: {
		    	options: {
		      		paths: ['app/assets/less/'],
		      		plugins: [
		        		new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]})
		      		]
		    	},
		    	files: {
		      		'app/assets/css/result.css': 'app/assets/less/main.less'
		    	}
		  	}
		},

		injector: {
			options: {},
			dev: {
				files: {
					'index.html': [
						'bower.json',
						'app/app.js',
						'app/app.config.js',
						'app/**/*Module.js',
						'app/**/*Route.js',
						'app/**/*Ctrl.js',
						'app/**/*Service.js',
						'app/**/*Directive.js'
					]
				}
			},
			production: {
				files: {
					'index.html': [
						'app/assets/css/**/*.css',
						'app/assets/js/*.js'
					]

				}
			}
		},

		ngtemplates: {
			app: {
				src: 'app/modules/**/*.html',
				dest: 'app/assets/js/templates.js',
				options: {
					module: '<%= pkg.name %>',
					root: 'app/',
					standAlone: false
				}
			}
		},

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			app: {
				files: {
					'min-safe/application.js': [
						'app/app.js',
						'app/app.config.js',
						'app/modules/**/*Module.js',
						'app/modules/**/*Route.js',
						'app/modules/**/*Ctrl.js',
						'app/modules/**/*Service.js',
						'app/modules/**/*Directive.js'
					]
				}
			}
		},

		uglify: {
			app: {
				options: {
					mangle: true
				},
				files: {
					'app/assets/js/<%= pkg.name %>-appbundle.js': 'min-safe/application.js'
				}
			}
		},

		cssmin: {
			target: {
				files: {
					'app/assets/css/result.css': ['app/assets/css/result.css'],
					'app/assets/css/angular-material/angular-material.css': ['app/assets/css/angular-material/angular-material.css'],
					'app/assets/css/angular-material-icons/angular-material-icons.css': ['app/assets/css/angular-material-icons/angular-material-icons.css']
				}
			}
		},

		copy: {
			main: {
				files: [
					{
						expand: true,
						src: 'node_modules/font-awesome/fonts/*',
						dest: 'app/assets/fonts/',
						flatten: true
					}
				]
			}
		}


	});

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project if something fail.
	grunt.option('force', true);

	// Register grunt tasks
	grunt.registerTask("build", [
		"jshint",
		"copy",
		"less",
		"exec",
		"concat",
		"ngAnnotate",
		"uglify",
		"ngtemplates",
		"cssmin",
		"injector:production",
		"concurrent",
		"clean"
	]);

	// Development task(s).
	grunt.registerTask('dev', ['jshint', 'injector:dev', 'copy', 'less', 'concurrent']);

};
