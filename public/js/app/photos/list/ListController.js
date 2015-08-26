define(['App', 'constants', 'photos/list/ListView'], function (App, Constants, ListView) {
  App.module('PhotosApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = {
      showPhotos: function (city) {
        require(['entities/photos'], function (photosEntities) {
          var fetchingphotos = city ? App.request('photo:entities', {city: city}) : App.request('photo:entities');

          $.when(fetchingphotos).done(function (photos) {
            console.log('controller photos: ', photos);
            var photoList = new ListView.PhotoList({collection: photos});

            photoList.on(Constants.photos.list.ANIMATE, function (val) {
              photoList.children.each(function (view) {
                view.animate(val);
              });
            });

            App.mainRegion.show(photoList);
          });
        });
      }
    };
  });

  return App.PhotosApp.List.Controller;
});
