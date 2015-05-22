define(['App', 'constants', 'searchbar/show/ShowView'], function (App, Constants, View) {
  App.module('SearchbarApp.Show', function (Show, App, Backbone, Marionette, $, _) {
    Show.Controller = {
      showSearchbar: function () {
        var searchbar = new View.Searchbar();

        searchbar.on(Constants.searchbar.SUBMIT, function (query) {
          App.trigger(Constants.students.list.PROFILES, query);
        });
        App.searchbarRegion.show(searchbar);
      }
    };
  });

  return App.SearchbarApp.Show.Controller;
});
