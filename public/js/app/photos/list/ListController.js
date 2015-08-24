define(['App', 'constants', 'photos/list/ListView'], function (App, Constants, ListView) {
  App.module('PhotosApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = {
      showPhotos: function (query) {
        require(['entities/photos'], function (photosEntities) {
          var
            fetchingphotos = App.request('photo:entities');

          $.when(fetchingphotos).done(function (photos) {
            console.log('controller photos: ', photos.length);

            var results = photos;
            //filter photos results if needed, e.g. when passed a city query
            if (query) {
              query = query.trim().toLowerCase();
              results = new App.Entities.PhotoCollection(photos.filter(function (photo) {
                return (photo.get('city').toLowerCase().indexOf(query) > -1);
              }));
            };

            var
              photoList = new ListView.PhotoList({collection: results});

            App.mainRegion.show(photoList);
          });
        });
      }
    };
  });

  return App.PhotosApp.List.Controller;
});
