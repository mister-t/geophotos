define([ 'App', 'config/storage/localstorage'], function (App) {
  App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {

    Entities.Student = Backbone.Model.extend({
      urlRoot: 'students',

      defaults: {
        emailAddr: '',
        sex: '',
        primeCurric: '',
        birthDate: '',
        firstName: '',
        lastName: ''
      },

      validate: function (attrs, options) {
        var errors = {};

        if (!attrs.emailAddr) {
          errors.emailAddr = 'can\'t be blank.';
        } else if (attrs.email === 'test@ucsf.edu') {
          errors.emailAddr = 'must be a valid address.';
        }

        if (!attrs.sex) {
          errors.sex = 'can\'t be blank.';
        }

        if (!attrs.primeCurric) {
          errors.primeCurric = 'can\'t be blank.';
        }

        if (!attrs.birthDate) {
          errors.birthDate = 'can\'t be blank.';
        }

        if (!attrs.firstName) {
          errors.firstName = 'can\'t be blank.';
        }

        if (!attrs.lastName) {
          errors.lastName = 'can\'t be blank.';
        }

        if (!_.isEmpty(errors)) {
          return errors;
        }
      }
    });

    Entities.configureStorage("App.Entities.Student");

    Entities.StudentCollection = Backbone.Collection.extend({
      url: 'students',
      model: Entities.Student
    });

    var initializeStudents = function() {
      var students = new Entities.StudentCollection([
        {
          "id" : 20770,
          "sex" : "F",
          "primeCurric" : "5752",
          "firstname" : "uaYa osainyD",
          "lastname" : "nUmee",
          "emailaddr" : "uaYaosainyD.nUmee@test.com",
          "termEnrollmentsForEnlisted": [{
            "calres" : "R",
            "entstat" : "C",
            "primecurr" : "P",
            "calendarForAppliesTo" : {
              "id" : "WI09"
            },
            "curriculumForEnrolledIn" : {
              "id" : "5750",
              "name" : "Physical Therapy (MS)   "
            },
            "studyListsForParentCurric": [{
              "id" : 1681385,
              "course" : "122.01",
              "name" : "Mammalian Physiology II",
              "ucode" : "PY122.010 "
            }, {
              "id" : 1681383,
              "course" : "110",
              "name" : "Ortho & Rehab Diag/Treatment",
              "ucode" : "PT1100    "
            }, {
              "id" : 1681384,
              "course" : "410",
              "name" : "Clinical Clerkship",
              "ucode" : "PT4100    "
            }]
          }]
        }
      ]);

      students.forEach(function(student) {
          student.save();
      });

      return students.models;
    };

    var API = {
      getStudentEntities: function() {
        var students = new Entities.StudentCollection();
        var defer = $.Deferred();

        students.fetch({
          success: function(data) {
            defer.resolve(data);
          }
        });

        var promise = defer.promise();

        $.when(promise).done(function(fetchedStudents) {
          if (fetchedStudents.length === 0) {
            var models = initializeStudents();
            students.reset(models);
          }
        });
        return promise;
      },

      getStudentEntity: function(studentId) {
        var student = new Entities.student({
          id: studentId
        });

        var defer = $.Deferred();

        student.fetch({
          success: function(data) {
            defer.resolve(data);
          },
          error: function(data) {
            defer.resolve(undefined);
          }
        });

        return defer.promise();
      }
    };

    App.reqres.setHandler("student:entities", function () {
      return API.getStudentEntities();
    });

    App.reqres.setHandler("student:entity", function (id) {
      return API.getStudentEntity(id);
    });
  });
  return;
});