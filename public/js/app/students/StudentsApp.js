define(['App', 'constants', 'students/list/ListController'], function (App, Constants, ListController) {
  App.module('StudentsApp', function (StudentsApp, App, Backbone, Marionette, $, _) {
    StudentsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'students': 'showStudents'
      }
    });

    var
      API = {
        showStudents: function () {
          App.navigate('/students'); //navigate to students to avoid triggering index twice
          App.trigger(Constants.sidebar.SHOW_SIDEBAR);
          ListController.showStudents();
        }
      };

    App.on('students:list:profiles', function () {
      API.showStudents();
    });

    App.addInitializer(function () {
      new StudentsApp.Router({
        controller: API
      });
    });
  });

  return App.StudentsApp;
});
