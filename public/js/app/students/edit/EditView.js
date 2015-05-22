define(['App', 'constants', 'hbs!students/edit/templates/heading', 'hbs!students/edit/templates/edit'], function (App, Constants, headingTpl, editTpl) {
  App.module('StudentsApp.Edit.View', function (View, App, Backbone, Marionette, $, _) {
    View.EditProfileHeading = Backbone.Marionette.ItemView.extend({

      className: 'col-lg-9',

      template: headingTpl,

      initialize: function (options) {
        this.evts = {
          'home_link': Constants.home.SHOW_HOME,
          'students_link': Constants.students.list.PROFILES,
          'profile_link': Constants.students.show.PROFILE
        };
      },

      events: {
        'click a#profile_link': function (evt) { this.showPage(evt); },
        'click a#home_link': function (evt) { this.showPage(evt); },
        'click a#students_link': function (evt) { this.showPage(evt); }
      },

      onRender: function () {
      },

      showPage: function (evt) {
        evt.preventDefault();
        this.trigger(this.evts[$(evt.currentTarget).attr('id')], this.model.get('id'));
      }
    });

    View.EditProfile = Marionette.ItemView.extend({
      className: 'row animated fadeInRight',

      template: editTpl
    });
  });

  return App.StudentsApp.Edit.View;
});
