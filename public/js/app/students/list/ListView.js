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
