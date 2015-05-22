define([
  'App',
  'constants',
  'jquery',
  'toastr',
  'hbs!students/list/templates/heading',
  'hbs!students/list/templates/student',
  'hbs!students/list/templates/students'
], function(App, Constants, $, toastr, headingTpl, studentTpl, studentsTpl) {

  App.module('StudentsApp.List.View', function(View, App, Backbone, Marionette, $, _){
    View.Heading = Backbone.Marionette.ItemView.extend({

      template: headingTpl,

      events: {
        'click a#home_link': function (evt) { this.goHome(evt); },
        'click a#select_btn': function (evt) { this.checkOnOff(evt); },
        'click a#email_btn': function (evt) { this.sendEmail(evt); }
      },

      initialize: function (options) {
        this.model = new Backbone.Model();
        this.model.set('isChecked', false);
      },

      onRender: function () {
        this.turnOnOff();
      },

      sendEmail: function (evt) {
        evt.preventDefault();
        console.log('sending mail');
        toastr.success('Only selected recipients will get the email', 'Email Sent!');
      },

      goHome: function (evt) {
        evt.preventDefault();
        this.trigger(Constants.home.SHOW_HOME);
      },

      checkOnOff: function (evt) {
        evt.preventDefault();
        this.reverseOnOff();
      },

      turnOn: function () {
        this.$('#select_btn').text('Uncheck All');
      },

      turnOff: function () {
        this.$('#select_btn').text('Select All');
      },

      turnOnOff: function () {
        if (this.model.get('isChecked')) {
          this.turnOn();
        } else {
          this.turnOff();
        }
      },

      reverseOnOff: function () {
        if (this.model.get('isChecked') === true) {
          this.turnOff();
          this.model.set('isChecked', false);
          this.trigger(Constants.students.select.OFF);
        } else {
          this.turnOn();
          this.model.set('isChecked', true);
          this.trigger(Constants.students.select.ON);
        }
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
