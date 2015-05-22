define(['App', 'constants', 'hbs!sidebar/show/templates/sidebar'], function (App, Constants, sidebarTpl) {
  App.module('SidebarApp.Show.View', function (View, App, Backbone, Marionette, $, _) {
    View.Sidebar = Marionette.ItemView.extend({
      className: 'nav',

      id: 'side-menu',

      template: sidebarTpl,

      initialize: function (options) {
        this.evts = {
          'view_students': Constants.students.list.PROFILES,
          'view_courses': Constants.courses.show.HOME,
          'nav_logout': Constants.auth.LOGOUT
        };
      },

      events: {
        'click li a': function (evt) { this.showPage(evt); }
      },

      showPage: function (evt) {
        evt.preventDefault();
        console.log(this.evts[$(evt.currentTarget).attr('id')]);
        this.trigger(this.evts[$(evt.currentTarget).attr('id')]);
      }
    });
  });

  return App.SidebarApp.Show.View;
});
