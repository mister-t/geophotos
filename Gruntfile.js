module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },
    less: {
      dev: {
        options: {
          paths: ["./static/styles"]
        },
        files: {
          "./public/css/app.css": "./static/styles/app.less"
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      html: {
        files: ["./public/**/*.html"],
        livereload: true
      },
      js: {
        files: ["./public/**/*.js"],
        livereload: true
      },
      css: {
        files: ["./public/**/*.css"],
        livereload: true
      },
      less: {
        files: "./static/styles/**/*.less",
        tasks: "less"
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['jshint']);
  grunt.registerTask('default', ['test', 'build']);
};
