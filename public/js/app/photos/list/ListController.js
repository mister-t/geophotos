define(['App', 'constants', 'photos/list/ListView'], function (App, Constants, ListView) {
  App.module('PhotosApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = {
      showPhotos: function (city) {
        require(['entities/photos'], function (photosEntities) {
          console.log('updating view to ' + city);
          var fetchingphotos = city ? App.request('photo:entities', {city: city}) : App.request('photo:entities');

          $.when(fetchingphotos).done(function (photos) {
            //console.log('controller photos: ', photos);
            var
              heading = new ListView.Heading({city: city});
              photoList = new ListView.PhotoList({collection: photos});

            heading.on(Constants.photos.list.CITY_CHANGED, function (city) {
              App.trigger(Constants.photos.list.CITY_CHANGED, city);
            });

            heading.on(Constants.photos.list.ANIMATION_CHANGED, function (effect) {
              photoList.children.each(function (view) {
                view.animate(effect);
              });
            });

            App.pageHeadingRegion.show(heading);
            App.mainRegion.show(photoList);
          });
        });
      }
    };
  });

  return App.PhotosApp.List.Controller;
});
