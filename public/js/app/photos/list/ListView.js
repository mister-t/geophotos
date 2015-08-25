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

      tagName: 'a',

      template: photoTpl,

      events: {
        'click': function (evt) { this.showProfile(evt); }
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
        'click .animation_select': function (evt) { this.handleAnimation(evt); }
      },

      initialize: function (options) {
      },

      handleAnimation: function (evt) {
        evt.preventDefault();
        this.animate($(evt.currentTarget).data('animation'));
      },

      animate: function (val) {
        $('#photo_list_results').removeClass().addClass(val + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass();
        });
      },

      onRender: function () {
      }
    });
  });

  return App.PhotosApp.List.View;
});
