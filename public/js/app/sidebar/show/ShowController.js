define(['App', 'constants', 'sidebar/show/ShowView'], function (App, Constants, View) {
  App.module('SidebarApp.Show', function (Show, App, Backbone, Marionette, $, _) {
    Show.Controller = {
      showSidebar: function () {
        var sidebar = new View.Sidebar();
        App.sidebarRegion.show(sidebar);
      }
    };
  });

  return App.SidebarApp.Show.Controller;
});
