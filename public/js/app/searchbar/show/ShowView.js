define([
  'App',
  'constants',
  'hbs!searchbar/show/templates/searchbar',
  'backbone.syphon'
], function (App, Constants, searchbarTpl) {
  App.module('SearchbarApp.Show.View', function (View, App, Backbone, Marionette, $, _) {
    View.Searchbar = Marionette.ItemView.extend({
      tagName: 'form',

      className: 'navbar-form-custom',

      attributes: {
        role: 'search',
        method:'post'
      },

      template: searchbarTpl,

      events: {
        'submit': function (evt) { this.searchStudents(evt); }
      },

      searchStudents: function (evt) {
        evt.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        if (data && data['top-search']) {
          console.log('top search : ', data['top-search']);
          this.trigger(Constants.searchbar.SUBMIT, data['top-search']);
        }
      }
    });
  });

  return App.SearchbarApp.Show.View;
});
