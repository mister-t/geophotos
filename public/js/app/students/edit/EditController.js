define(['App', 'constants', 'students/edit/EditView'], function (App, Constants, View) {
  App.module('StudentsApp.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    Edit.Controller = {
      editStudent: function (studentId) {
        require(['entities/students'], function (studentsEntities) {
          var fetchingStudent = App.request('student:entity', studentId);

          $.when(fetchingStudent).done(function (student) {
            var
              heading = new View.EditProfileHeading(),
              profile = new View.EditProfile({model: student});

              heading.on(Constants.home.SHOW_HOME, function () {
                App.trigger(Constants.home.SHOW_HOME);
              });

              heading.on(Constants.students.list.PROFILES, function () {
                App.trigger(Constants.students.list.PROFILES);
              });

              heading.on(Constants.students.show.PROFILE, function () {
                App.trigger(Constants.students.show.PROFIL);
              });

            App.pageHeadingRegion.show(heading);
            $('#app-page-heading').show();
            App.mainRegion.show(profile);
          });
        });
      }
    };
  });

  return App.StudentsApp.Edit.Controller;
});
