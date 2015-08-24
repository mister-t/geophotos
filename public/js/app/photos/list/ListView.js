define([
  'App',
  'constants',
  'jquery',
  'hbs!photos/list/templates/heading',
  'hbs!photos/list/templates/photo',
  'hbs!photos/list/templates/photos'
], function(App, Constants, $, headingTpl, photoTpl, photosTpl) {

  App.module('PhotosApp.List.View', function(View, App, Backbone, Marionette, $, _){
    View.Heading = Backbone.Marionette.ItemView.extend({

      template: headingTpl,

      events: {
      },

      initialize: function (options) {
        this.model = new Backbone.Model();
      },

      onRender: function () {
      }
    });

    View.Photo = Backbone.Marionette.ItemView.extend({

      className: 'col-lg-4',

      template: photoTpl,

      events: {
      },

      showProfile: function (evt) {
        evt.preventDefault();
      },

      onRender: function () {
      }
    });

    View.PhotoList = Backbone.Marionette.CompositeView.extend({
      id: 'photo_list',

      template: photosTpl,

      itemViewContainer: '#photo_list_results',

      itemView: View.Photo,

      events: {
      },

      initialize: function (options) {
      },

      onRender: function () {
      }
    });
  });

  return App.PhotosApp.List.View;
});
