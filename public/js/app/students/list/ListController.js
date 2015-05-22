define(['App', 'students/list/ListView'], function (App, ListView) {
  App.module('StudentsApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = {
      showStudents: function () {
        require(['entities/students'], function (studentsEntities) {
          var
            fetchingStudents = App.request('student:entities');

          $.when(fetchingStudents).done(function (students) {
            console.log('controller students: ', students.length);
            var
              studentList = new ListView.StudentList({collection: students}),
              pageHeading = new ListView.Heading();

            App.mainRegion.show(studentList);
            App.pageHeadingRegion.show(pageHeading);
            $('#app-page-heading').show();
          });
        });
      }
    };
  });

  return App.StudentsApp.List.Controller;
});
