define([
  'App',
  'jquery',
  'hbs!students/list/templates/heading',
  'hbs!students/list/templates/student',
  'hbs!students/list/templates/students'
], function(App, $, headingTpl, studentTpl, studentsTpl) {

  App.module('StudentsApp.List.View', function(View, App, Backbone, Marionette, $, _){
    View.Heading = Backbone.Marionette.ItemView.extend({

      className: 'col-lg-9',

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
        'mouseover': function (evt) { this.mouseoverCard(evt); },
        'mouseout': function (evt) { this.mouseoutCard(evt); }
      },

      mouseoverCard: function (evt) {
        evt.preventDefault();
        this.$('.contact-box').addClass('animated pulse');
      },

      mouseoutCard: function (evt) {
        evt.preventDefault();
        this.$('.contact-box').removeClass('animated pulse');
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
      },

      onRender: function () {
      }
    });
  });

  return App.StudentsApp.List.View;
});
