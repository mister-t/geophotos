define(['App', 'jquery', 'hbs!students/list/templates/student', 'hbs!students/list/templates/students'], function(App, $, studentTpl, studentsTpl) {

  App.module('StudentsApp.List.View', function(View, App, Backbone, Marionette, $, _){
    View.Student = Backbone.Marionette.ItemView.extend({
      tagName: 'tr',

      template: studentTpl,

      events: {
      },

      onRender: function () {
      }
    });

    View.StudentList = Backbone.Marionette.CompositeView.extend({
      id: 'student_list',

      template: studentsTpl,

      itemViewContainer: 'table',

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
