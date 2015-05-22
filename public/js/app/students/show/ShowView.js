define(['App', 'constants', 'hbs!students/show/templates/heading', 'hbs!students/show/templates/profile'], function (App, Constants, headingTpl, profileTpl) {
  App.module('StudentsApp.Show.View', function (View, App, Backbone, Marionette, $, _) {
    View.ProfileHeading = Backbone.Marionette.ItemView.extend({

      className: 'col-lg-9',

      template: headingTpl,

      events: {
      },

      onRender: function () {
      }
    });

    View.Profile = Marionette.ItemView.extend({
      className: 'row animated fadeInRight',

      template: profileTpl
    });
  });

  return App.StudentsApp.Show.View;
});
