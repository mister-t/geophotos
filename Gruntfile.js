module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      desktopJS: {
        options: {
          baseUrl: "public/js/app",
          wrap: true,
          // Cannot use almond since it does not currently appear to support requireJS's config-map
          //name: "../libs/almond",
          preserveLicenseComments: false,
          optimize: "uglify",
          mainConfigFile: "public/js/app/config/config.js",
          include: ["init/DesktopInit"],
          name: "init/DesktopInit",
          out: "public/js/app/init/DesktopInit.min.js"
        }
      },
      desktopCSS: {
        options: {
          optimizeCss: "standard",
          cssIn: "./public/css/app.css",
          out: "./public/css/app.min.css"
        }
      }
    },
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
          paths: ["./public/css"]
        },
        files: {
          "./public/css/app.css": "./styles/app.less"
        }
      }
    },
    nodemon: {
      dev: {
        script: './bin/www'
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
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
        files: "./public/**/*.less",
        tasks: "less"
      },
      jade: {
          files: ['./views/**/*.jade']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');


  grunt.registerTask('build:debug', 'Lint and compile', [
    'jshint', 'less:dev'
  ]);

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('build', ['requirejs:desktopJS', 'requirejs:desktopCSS']);
  grunt.registerTask('default', ['test', 'build']);
  grunt.registerTask('dev', ['build:debug', 'concurrent']);
};
