define([
  'App',
  'constants',
  'students/list/ListController',
  'students/show/ShowController',
  'students/edit/EditController'
], function (App, Constants, ListController, ShowController, EditController) {
  App.module('StudentsApp', function (StudentsApp, App, Backbone, Marionette, $, _) {
    StudentsApp.Router = Marionette.AppRouter.extend({
      appRoutes: {
        'students'    : 'showStudents',
        'students/:id': 'showStudent',
        'students/:id/edit': 'editStudent'
      }
    });

    var
      API = {
        showStudents: function (query) {
          App.navigate('/students'); //navigate to students to avoid triggering index twice
          App.trigger(Constants.sidebar.SHOW_SIDEBAR);
          App.trigger(Constants.searchbar.SHOW_SEARCHBAR);
          ListController.showStudents(query);
        },

        showStudent: function (studentId) {
          App.navigate('/students/' + studentId);
          App.trigger(Constants.sidebar.SHOW_SIDEBAR);
          App.trigger(Constants.searchbar.SHOW_SEARCHBAR);
          ShowController.showStudent(studentId);
        },

        editStudent: function (studentId) {
          App.navigate('/students/' + studentId + '/edit');
          App.trigger(Constants.sidebar.SHOW_SIDEBAR);
          App.trigger(Constants.searchbar.SHOW_SEARCHBAR);
          EditController.editStudent(studentId);
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

    App.on(Constants.students.edit.SHOW, function (studentId) {
      API.editStudent(studentId);
    });

    App.on(Constants.students.list.PROFILES, function (query) {
      API.showStudents(query);
    });

    App.addInitializer(function () {
      new StudentsApp.Router({
        controller: API
      });
    });
  });

  return App.StudentsApp;
});
