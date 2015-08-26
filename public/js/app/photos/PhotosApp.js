define([
  'App',
  'constants',
  'photos/list/ListController'
], function (App, Constants, ListController) {
  App.module('PhotosApp', function (PhotosApp, App, Backbone, Marionette, $, _) {
    PhotosApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'photos'      : 'showPhotos',
        'photos/:city': 'showPhotos'
      }
    });

    var
      API = {
        showPhotos: function (city) {
          console.log('showPhotos called; city = ' + city);
          city || (city = 'sf');
          App.navigate('/photos/' + city);
          ListController.showPhotos(city);
        }
      };

    App.on(Constants.photos.SHOW_LIST, function (query) {
      console.log('photo sub app: city = ' + query);
      API.showPhotos(query);
    });

    App.addInitializer(function () {
      new PhotosApp.Router({
        controller: API
      });
    });
  });

  return App.PhotosApp;
});
