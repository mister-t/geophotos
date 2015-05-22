define(['App', 'constants', 'students/show/ShowView'], function (App, Constants, View) {
  App.module('StudentsApp.Show', function (Show, App, Backbone, Marionette, $, _) {
    Show.Controller = {
      showStudent: function (studentId) {
        require(['entities/students'], function (studentsEntities) {
          var fetchingStudent = App.request('student:entity', studentId);

          $.when(fetchingStudent).done(function (student) {
            var
              heading = new View.ProfileHeading(),
              profile = new View.Profile({model: student});

              heading.on(Constants.home.SHOW_HOME, function () {
                App.trigger(Constants.home.SHOW_HOME);
              });

              heading.on(Constants.students.list.PROFILES, function () {
                App.trigger(Constants.students.list.PROFILES);
              });

              profile.on(Constants.students.edit.SHOW, function (studentId) {
                console.log('caught edit profile: ', studentId);
                App.trigger(Constants.students.edit.SHOW, studentId);
              });

            App.pageHeadingRegion.show(heading);
            $('#app-page-heading').show();
            App.mainRegion.show(profile);
          });
        });
      }
    };
  });

  return App.StudentsApp.Show.Controller;
});
