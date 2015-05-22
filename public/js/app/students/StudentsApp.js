define(['App', 'constants', 'students/list/ListController', 'students/show/ShowController'], function (App, Constants, ListController, ShowController) {
  App.module('StudentsApp', function (StudentsApp, App, Backbone, Marionette, $, _) {
    StudentsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'students'    : 'showStudents',
        'students/:id': 'showStudent'
      }
    });

    var
      API = {
        showStudents: function () {
          App.navigate('/students'); //navigate to students to avoid triggering index twice
          App.trigger(Constants.sidebar.SHOW_SIDEBAR);
          ListController.showStudents();
        },

        showStudent: function (studentId) {
          App.navigate('/students/' + studentId);
          App.trigger(Constants.sidebar.SHOW_SIDEBAR);
          ShowController.showStudent(studentId);
        },

        selectStudents: function () {
          ListController.selectStudents();
        },

        unselectStudents: function () {
          ListController.unselectStudents();
        }
      };

    App.on(Constants.students.select.ON, function () {
      API.selectStudents();
    });

    App.on(Constants.students.select.OFF, function () {
      API.unselectStudents();
    });

    App.on(Constants.students.show.PROFILE, function (studentId) {
      API.showStudent(studentId);
    });

    App.on(Constants.students.list.PROFILES, function (studentId) {
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
