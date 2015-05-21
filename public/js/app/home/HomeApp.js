define(['App', 'constants', 'home/show/ShowController'], function (App, Constants, ShowController) {
  App.module('HomeApp', function (HomeApp, App, Backbone, Marionette, $, _) {
    HomeApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'home': 'showHome'
      }
    });

    var API = {
      showHome: function () {
        ShowController.showHome();
        App.navigate('/home');
      }
    };

    App.on(Constants.home.SHOW_HOME, function () {
      API.showHome();
    });

    App.addInitializer(function () {
      new HomeApp.Router({
        controller: API
      });
    });
  });

  return App.HomeApp;
});
