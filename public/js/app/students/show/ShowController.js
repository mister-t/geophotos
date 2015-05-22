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
