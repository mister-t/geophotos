define(['App', 'backbone.localstorage'], function (App) {
  App.module('Entities', function (Entities, App, Backbone, Marionette, $, _) {
    var findStorageKey = function(entity) {
      // use a model's urlRoot value
      if (entity.urlRoot) {
        return _.result(entity, "urlRoot");
      }
      // use a collection's url value
      if (entity.url) {
        return _.result(entity, "url");
      }

      throw new Error("Unable to determine storage key");
    };

    var StorageMixin = function(entityPrototype) {
      var storageKey = findStorageKey(entityPrototype);
      return {
        localStorage: new Backbone.LocalStorage(storageKey)
      };
    };

    var getEntity = function(constructorString) {
      var sections = constructorString.split("."),
          entity = window;

      _.each(sections, function(section) {
          entity = entity[section];
      });

      return entity;
    };

    Entities.configureStorage = function(constructorString) {
      var OldConstructor = getEntity(constructorString);
      var NewConstructor = function() {
        var obj = new OldConstructor(arguments[0], arguments[1]);
        _.extend(obj, new StorageMixin(OldConstructor.prototype));

        return obj;
      }
      NewConstructor.prototype = OldConstructor.prototype;

      eval(constructorString + " = NewConstructor;");
    };
  });

  return App.Entities.configureStorage;
});
