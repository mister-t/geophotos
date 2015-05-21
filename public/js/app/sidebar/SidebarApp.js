define(['App', 'constants', 'sidebar/show/ShowController'], function (App, Constants, ShowController) {
  App.module('SidebarApp', function (SidebarApp, App, Backbone, Marionette, $, _) {
    SidebarApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
      }
    });

    var API = {
      showSidebar: function () {
        ShowController.showSidebar();
      }
    };

    App.on(Constants.sidebar.SHOW_SIDEBAR, function () {
      API.showSidebar();
    });

    App.addInitializer(function () {
      new SidebarApp.Router({
        controller: API
      });
    });
  });

  return App.SidebarApp;
});
