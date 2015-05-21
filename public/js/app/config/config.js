require.config({
  baseUrl: "/js/app",
  paths: {
    constants: "config/Constants",
    desktopInit: "init/DesktopInit",
    jquery: "../libs/jquery",
    metisMenu: "../libs/plugins/metisMenu/jquery.metisMenu",
    slimscroll: "../libs/plugins/slimscroll/jquery.slimscroll",
    inspinia: "../libs/inspinia",
    pace: "../libs/plugins/pace/pace.min",
    bootstrap: "../libs/bootstrap.min",
    underscore: "../libs/lodash",
    backbone: "../libs/backbone",
    marionette: "../libs/backbone.marionette",
    handlebars: "../libs/handlebars",
    hbs: "../libs/hbs",
    i18nprecompile: "../libs/i18nprecompile",
    json2: "../libs/json2",
    "backbone.syphon": "../libs/backbone.syphon",
    "backbone.localstorage":"../libs/backbone.localstorage",
    "text":"../libs/text"
  },
  shim: {
    backbone: {
      deps: [
          "underscore", "jquery"
      ],
      "exports": "Backbone"
    },
    "backbone.syphon": [
      "backbone"
    ],
    "backbone.localstorage": [
      "backbone"
    ],
    bootstrap: [
      "jquery"
    ],
    metisMenu: [
      "jquery"
    ],
    slimscroll: [
      "jquery"
    ],
    inspinia: [
      "jquery"
    ],
    pace: [
      "jquery"
    ],
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
