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

      id: 'menu_options',

      template: headingTpl,

      events: {
        'change select': function (evt) { this.selectCity(evt); }
      },

      initialize: function (options) {
        options || (options = {});
        this.city = options.city;
      },

      selectCity: function (evt) {
        evt.preventDefault();
        this.trigger(Constants.photos.list.CITY_CHANGED, evt.target.value);
      },

      onRender: function () {
        this.$("select option[value='" + this.city + "']").attr("selected", "selected");
      }
    });

    View.Photo = Backbone.Marionette.ItemView.extend({

      tagName: 'li',

      template: photoTpl,

      events: {
        'click': function (evt) { this.showProfile(evt); }
      },

      showProfile: function (evt) {
        evt.preventDefault();
      },

      onRender: function () {
      },

      animate: function (val) {
        this.$el.removeClass().addClass(val + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass();
        });
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
        this.trigger(Constants.photos.list.ANIMATE, val);
      },

      onRender: function () {
      }
    });
  });

  return App.PhotosApp.List.View;
});
