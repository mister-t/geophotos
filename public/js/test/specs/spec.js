// Jasmine Unit Testing Suite
define(['jquery', 'backbone', 'marionette', 'App'], function($, Backbone, Marionette, App) {
  // Test suite that includes all of the Jasmine unit tests
  describe('MRB-lite', function() {

    // Backbone View Suite: contains all tests related to views
    describe("Marionette App instantiation", function() {
      //Initialize App in Desktop Mode (App is global var)
      App.start();
      it("App should start and have Regions", function() {
          expect(App.mainRegion.el).toEqual("#app-main");
          expect(App.pageHeadingRegion.el).toEqual("app-page-heading");
      });

    }); // End of the View test suite
  }); // End of the BRB test suite
});

