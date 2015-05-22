define(['App', 'constants', 'hbs!students/show/templates/heading', 'hbs!students/show/templates/profile'], function (App, Constants, headingTpl, profileTpl) {
  App.module('StudentsApp.Show.View', function (View, App, Backbone, Marionette, $, _) {
    View.ProfileHeading = Backbone.Marionette.ItemView.extend({

      className: 'col-lg-9',

      template: headingTpl,

      initialize: function (options) {
        this.evts = {
          'home_link': Constants.home.SHOW_HOME,
          'students_link': Constants.students.list.PROFILES
        };
      },

      events: {
        'click a#home_link': function (evt) { this.showPage(evt); },
        'click a#students_link': function (evt) { this.showPage(evt); }
      },

      onRender: function () {
      },

      showPage: function (evt) {
        evt.preventDefault();
        this.trigger(this.evts[$(evt.currentTarget).attr('id')]);
      }
    });

    View.Profile = Marionette.ItemView.extend({
      className: 'row animated fadeInRight',

      template: profileTpl,

      events: {
        'click a#edit_link': function (evt) { this.editProfile(evt); }
      },

      editProfile: function (evt) {
        evt.preventDefault();
        this.trigger(Constants.students.edit.SHOW, this.model.get('id'));
      }
    });
  });

  return App.StudentsApp.Show.View;
});
