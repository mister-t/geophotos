define(['App', 'constants', 'students/list/ListView'], function (App, Constants, ListView) {
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

              studentList.on(Constants.students.show.PROFILE, function (childViewModel) {
                console.log('student id = ', childViewModel.get('id'));
                App.trigger(Constants.students.show.PROFILE, childViewModel.get('id'));
              });


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
