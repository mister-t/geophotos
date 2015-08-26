require.config({
  baseUrl: "/js/app",
  paths: {
    constants: "config/Constants",
    desktopInit: "init/DesktopInit",
    jquery: "../libs/jquery",
    underscore: "../libs/lodash",
    backbone: "../libs/backbone",
    marionette: "../libs/backbone.marionette",
    handlebars: "../libs/handlebars",
    hbs: "../libs/hbs",
    i18nprecompile: "../libs/i18nprecompile",
    json2: "../libs/json2",
    "text":"../libs/text"
  },
  shim: {
    backbone: {
      deps: [
          "underscore", "jquery"
      ],
      "exports": "Backbone"
    },
    marionette: {
      deps: [
        "underscore",
        "backbone",
        "jquery"
      ],
      exports: "Marionette"
    },
    handlebars: {
      exports: "Handlebars"
    }
  },
  // hbs config - must duplicate in Gruntfile.js Require build
  hbs: {
    templateExtension: "html",
    helperDirectory: "templates/helpers/",
    i18nDirectory: "templates/i18n/",

    compileOptions: {}        // options object which is passed to Handlebars compiler
  }
});
