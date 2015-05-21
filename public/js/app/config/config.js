require.config({
  baseUrl: "/js/app",
  paths: {
    desktopInit: "init/DesktopInit",
    jquery: "../libs/jquery",
    underscore: "../libs/lodash",
    backbone: "../libs/backbone",
    marionette: "../libs/backbone.marionette",
    handlebars: "../libs/handlebars",
    hbs: "../libs/hbs",
    i18nprecompile: "../libs/i18nprecompile",
    json2: "../libs/json2",
    "backbone.syphon": "../libs/backbone.syphon",
    "localstorage": "../libs/backbone.localstorage",
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
  }
});
