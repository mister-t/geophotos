define(['App', 'constants', 'hbs!home/show/templates/home'], function (App, Constants, homeTpl) {
  App.module('HomeApp.Show.View', function (View, App, Backbone, Marionette, $, _) {
    View.Home = Marionette.ItemView.extend({
      className: 'row',

      template: homeTpl
    });
  });

  return App.HomeApp.Show.View;
});
