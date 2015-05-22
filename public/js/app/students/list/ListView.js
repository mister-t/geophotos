define([
  'App',
  'constants',
  'jquery',
  'hbs!students/list/templates/heading',
  'hbs!students/list/templates/student',
  'hbs!students/list/templates/students'
], function(App, Constants, $, headingTpl, studentTpl, studentsTpl) {

  App.module('StudentsApp.List.View', function(View, App, Backbone, Marionette, $, _){
    View.Heading = Backbone.Marionette.ItemView.extend({

      template: headingTpl,

      events: {
      },

      onRender: function () {
      }
    });

    View.Student = Backbone.Marionette.ItemView.extend({

      className: 'col-lg-4',

      template: studentTpl,

      events: {
        'mouseover address': function (evt) { this.mouseoverCard(evt); },
        'mouseout address': function (evt) { this.mouseoutCard(evt); },
        'click a': function (evt) { this.showProfile(evt); }
      },

      mouseoverCard: function (evt) {
        evt.preventDefault();
        this.$('.contact-box').addClass('animated pulse');
      },

      mouseoutCard: function (evt) {
        evt.preventDefault();
        this.$('.contact-box').removeClass('animated pulse');
      },

      showProfile: function (evt) {
        evt.preventDefault();
        this.trigger(Constants.students.show.PROFILE);
      },

      onRender: function () {
      }
    });

    View.StudentList = Backbone.Marionette.CompositeView.extend({
      id: 'student_list',

      template: studentsTpl,

      itemViewContainer: '#student_list_results',

      itemView: View.Student,

      events: {
      },

      initialize: function (options) {
        this.on('itemview:' + Constants.students.show.PROFILE, function (childView) {
          this.trigger(Constants.students.show.PROFILE, childView.model);
        }, this);
      },

      onRender: function () {
      }
    });
  });

  return App.StudentsApp.List.View;
});
