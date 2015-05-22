define(['App', 'constants', 'home/show/ShowView'], function (App, Constants, View) {
  App.module('HomeApp.Show', function (Show, App, Backbone, Marionette, $, _) {
    Show.Controller = {
      showHome: function () {
        var home = new View.Home();
        App.mainRegion.show(home);
        $('#app-page-heading').hide();
      }
    };
  });

  return App.HomeApp.Show.Controller;
});
