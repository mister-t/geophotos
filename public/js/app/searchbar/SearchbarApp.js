define(['App', 'constants', 'searchbar/show/ShowController'], function (App, Constants, ShowController) {
  App.module('SearchbarApp', function (SearchbarApp, App, Backbone, Marionette, $, _) {
    SearchbarApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
      }
    });

    var API = {
      showSearchbar: function () {
        ShowController.showSearchbar();
      }
    };

    App.on(Constants.searchbar.SHOW_SEARCHBAR, function () {
      API.showSearchbar();
    });

    App.addInitializer(function () {
      new SearchbarApp.Router({
        controller: API
      });
    });
  });

  return App.SearchbarApp;
});
