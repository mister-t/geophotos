define(['App', 'constants', 'sidebar/show/ShowView'], function (App, Constants, View) {
  App.module('SidebarApp.Show', function (Show, App, Backbone, Marionette, $, _) {
    Show.Controller = {
      showSidebar: function () {
        var sidebar = new View.Sidebar();
        sidebar.on(Constants.students.list.PROFILES, function () {
          App.trigger(Constants.students.list.PROFILES);
        });

        App.sidebarRegion.show(sidebar);
      }
    };
  });

  return App.SidebarApp.Show.Controller;
});
