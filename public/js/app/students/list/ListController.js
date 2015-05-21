define(['App', 'students/list/ListView'], function (App, ListView) {
  App.module('StudentsApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = {
      showStudents: function () {
        require(['entities/students'], function (studentsEntities) {
          var
            fetchingStudents = App.request('student:entities');

          $.when(fetchingStudents).done(function (students) {
            console.log('controller students: ', students.length);
            var studentList = new ListView.StudentList({collection: students});

            App.mainRegion.show(studentList);
          });
        });
      }
    };
  });

  return App.StudentsApp.List.Controller;
});
