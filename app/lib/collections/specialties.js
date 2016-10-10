Specialties = new Mongo.Collection('specialties');

var schema = {
  name: {
    type: String,
    trim: true,
    max: 100
  },
};

if (Meteor.isClient) {
  schema.name.label = function() {
    return TAPi18n.__('specialties_specialty');
  };
}

Specialties.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  Specialties.allow({
    insert: function (userId, doc) {
      return true;
    },

    update: function (userId, doc, fieldNames, modifier) {
      return true;
    },

    remove: function (userId, doc) {
      return true;
    }
  });
}
