define(['App', 'constants', 'students/list/ListView'], function (App, Constants, ListView) {
  App.module('StudentsApp.List', function (List, App, Backbone, Marionette, $, _) {

    List.Controller = {
      showStudents: function (query) {
        require(['entities/students'], function (studentsEntities) {
          var
            fetchingStudents = App.request('student:entities');

          $.when(fetchingStudents).done(function (students) {
            console.log('controller students: ', students.length);

            var results = students;
            if (query) {
              query = query.trim().toLowerCase();
              results = new App.Entities.StudentCollection(students.filter(function (student) {
                return (student.get('firstname').toLowerCase().indexOf(query) > -1 ||
                    student.get('lastname').toLowerCase().indexOf(query) > -1);
              }));
            };

            var
              studentList = new ListView.StudentList({collection: results}),
              pageHeading = new ListView.Heading();

              pageHeading.on(Constants.home.SHOW_HOME, function () {
                App.trigger(Constants.home.SHOW_HOME);
              });

              pageHeading.on(Constants.students.select.ON, function () {
                App.trigger(Constants.students.select.ON);
              });

              pageHeading.on(Constants.students.select.OFF, function () {
                App.trigger(Constants.students.select.OFF);
              });

              studentList.on(Constants.students.show.PROFILE, function (childViewModel) {
                console.log('student id = ', childViewModel.get('id'));
                App.trigger(Constants.students.show.PROFILE, childViewModel.get('id'));
              });


            App.mainRegion.show(studentList);
            App.pageHeadingRegion.show(pageHeading);
            $('#app-page-heading').show();
          });
        });
      },

      selectStudents: function () {
        $('#app-main input[type=checkbox]').prop('checked', true);
      },

      unselectStudents: function () {
        $('#app-main input[type=checkbox]').prop('checked', false);
      }
    };
  });

  return App.StudentsApp.List.Controller;
});
