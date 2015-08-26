define([ 'App'], function (App) {
  App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    Entities.Photo = Backbone.Model.extend({
      defaults: {
        imgSrc:'',
        caption:'',
        photoId: 0
      },

      validate: function (attrs, options) {
        /*
         * Validation is run automatically on 'save';
         * If errors existed, the save will not propagate to local storage
         */
        var errors = {};

        if (!attrs.imgSrc) {
          errors.imgSrc = 'can\'t be blank.';
        }

        if (!_.isEmpty(errors)) {
          return errors;
        }
      }
    });

    Entities.PhotoCollection = Backbone.Collection.extend({
      model: Entities.Photo,

      urlRoot: '/photos',

      url: function () {
        if (this.city) {
          return '/photos/' + this.city;
        } else {
          return '/photos/sf'; //San Fran is the default
        }
      },

      initialize: function (options) {
        if (!options) {
          options = {};
        }

        this.city = options.city;
      }
    });

    var API = {
      getPhotosEntities: function (options) {
        console.log('getPhotoEntities called; city = ' + options.city);
        var photos = (options && options.city) ? new Entities.PhotoCollection(options) : new Entities.PhotoCollection();
        var defer = $.Deferred();

        photos.fetch()
        .done(function (data, textStatus, jqXHR) {
          photos.reset(data);
          defer.resolve(photos);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          defer.resolve(undefined);
        });

        return defer.promise();
      },

      getPhotoEntity: function (photoId) {
        var photo = new Entities.Photo({
          id: photoId
        });

        var defer = $.Deferred();

        photo.fetch()
        .done(function(data) {
          defer.resolve(data);
        })
        .fail(function(data) {
          defer.resolve(undefined);
        });

        return defer.promise();
      }
    };

    App.reqres.addHandler('photo:entities', function (options) {
      return API.getPhotosEntities(options);
    });

    App.reqres.addHandler('photo:entity', function (id) {
      return API.getPhotoEntity(id);
    });
  });
  return;
});
