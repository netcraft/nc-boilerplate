module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		config: {
			src: "app",
			dest: "dist"
		},
		browserify: {
			js: {
				src: "<%= config.src %>/app.js",
				dest: "<%= config.dest %>/app.js"
			}
		},
		copy: {
			all: {
				expand: true,
				cwd: "<%= config.src %>",
				src: ["**/*.html", "**/*.css"],
				dest: "<%= config.dest %>",
			}
		},
		watch: {
			js: {
				files: ["<%= config.src %>/**/*.js"],
				tasks: ["browserify"],
				options: {
		        	livereload: "<%= connect.server.options.livereload %>"
		        }
			}
		},
		clean: ["<%= config.dest %>"],
		connect: {
			server: {
				options: {
					livereload: true,
					base: "<%= config.dest %>"
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-browserify");
	grunt.loadNpmTasks("grunt-contrib-copy");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-contrib-clean");
	grunt.loadNpmTasks("grunt-contrib-connect");

	grunt.registerTask("default", function () {

		grunt.task.run("clean");
		grunt.task.run("browserify");
		grunt.task.run("copy");
		grunt.task.run("connect");
		grunt.task.run("watch");
	});
};
