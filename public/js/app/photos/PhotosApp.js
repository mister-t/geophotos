define([
  'App',
  'constants',
  'photos/list/ListController'
], function (App, Constants, ListController) {
  App.module('PhotosApp', function (PhotosApp, App, Backbone, Marionette, $, _) {
    PhotosApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'photos'    : 'showPhotos'
      }
    });

    var
      API = {
        showPhotos: function (query) {
          App.navigate('/photos');
          ListController.showPhotos(query);
        }
      };

    App.on(Constants.photos.SHOW_LIST, function (query) {
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
