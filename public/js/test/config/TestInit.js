require.config({
  baseUrl:"./js/libs",
  // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
  // probably a good idea to keep version numbers in the file names for updates checking
  paths:{
    // Core Libraries
    "jquery":"jquery",
    "underscore":"lodash",
    "backbone":"backbone",
    "marionette":"backbone.marionette",
    "handlebars":"handlebars",
    "jasmine":"jasmine",
    "jasmine-html":"jasmine-html"
  },
  // Sets the configuration for your third party scripts that are not AMD compatible
  shim:{
    "backbone":{
        "deps":["underscore"],
        // Exports the global window.Backbone object
        "exports":"Backbone"
    },
    "marionette":{
        "deps":["underscore", "backbone", "jquery"],
        // Exports the global window.Marionette object
        "exports":"Marionette"
    },
    "handlebars":{
        "exports":"Handlebars"
    },
    // Jasmine Unit Testing
    "jasmine":{
        // Exports the global 'window.jasmine' object
        "exports":"jasmine"
    },

    // Jasmine Unit Testing helper
    "jasmine-html":{
        "deps":["jasmine"],
        "exports":"jasmine"
    }
  }
});

// Include Desktop Specific JavaScript files here (or inside of your Desktop router)
require(["jquery", "backbone", "marionette", "jasmine-html"],
function ($, Backbone, Marionette, jasmine) {
  var specs = ['../test/specs/app/photos/list/ListViewSpec'];

  $(function () {
    require(specs, function () {
      jasmine.getEnv().addReporter(new jasmine.TrivialReporter());
      jasmine.getEnv().execute();
    });
  });
});
