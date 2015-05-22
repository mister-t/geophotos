define([
  'App',
  'constants',
  'hbs!students/edit/templates/heading',
  'hbs!students/edit/templates/edit',
  'backbone.syphon'
], function (App, Constants, headingTpl, editTpl) {
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

      template: editTpl,

      events: {
        'click button.js-submit': 'submitClicked',
        'click button.js-cancel': 'cancelClicked'
      },

      cancelClicked: function(evt){
        evt.preventDefault();
        this.trigger(Constants.students.edit.CANCEL, this.model.get('id'));
      },

      submitClicked: function(evt){
        evt.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger(Constants.students.edit.SUBMIT, data);
      },

      onFormDataInvalid: function (errors){
        var $view = this.$el;

        var clearFormErrors = function (){
          var $form = $view.find('form');

          $form.find('.help-inline.error').each(function (){
            $(this).remove();
          });

          $form.find('.control-group.error').each(function (){
            $(this).removeClass('has-error');
          });
        }

        var markErrors = function (value, key) {
          var $controlGroup = $view.find('#profile-' + key).parent();

          var $errorEl = $('<span>', { class: 'help-inline error', text: value });
          $controlGroup.append($errorEl).addClass('has-error');
        }

        clearFormErrors();
        _.each(errors, markErrors);
      }
    });
  });

  return App.StudentsApp.Edit.View;
});
