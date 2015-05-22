define(['App', 'constants', 'students/edit/EditView'], function (App, Constants, View) {
  App.module('StudentsApp.Edit', function (Edit, App, Backbone, Marionette, $, _) {
    Edit.Controller = {
      editStudent: function (studentId) {
        require(['entities/students'], function (studentsEntities) {
          var fetchingStudent = App.request('student:entity', studentId);

          $.when(fetchingStudent).done(function (student) {
            var
              heading = new View.EditProfileHeading({model: student}),
              editProfile = new View.EditProfile({model: student});

              heading.on(Constants.home.SHOW_HOME, function () {
                App.trigger(Constants.home.SHOW_HOME);
              });

              heading.on(Constants.students.list.PROFILES, function () {
                App.trigger(Constants.students.list.PROFILES);
              });

              heading.on(Constants.students.show.PROFILE, function (studentId) {
                App.trigger(Constants.students.show.PROFILE, studentId);
              });

              editProfile.on(Constants.students.edit.CANCEL, function (studentId) {
                App.trigger(Constants.students.show.PROFILE, studentId);
              });

              editProfile.on(Constants.students.edit.SUBMIT, function (data) {
                if(student.save(data)){
                  App.trigger(Constants.students.show.PROFILE, student.get('id'));
                }
                else{
                  editProfile.triggerMethod(Constants.students.edit.INVALID, student.validationError);
                }
              });

            App.pageHeadingRegion.show(heading);
            $('#app-page-heading').show();
            App.mainRegion.show(editProfile);
          });
        });
      }
    };
  });

  return App.StudentsApp.Edit.Controller;
});
