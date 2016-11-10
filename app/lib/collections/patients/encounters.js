Encounters = new Mongo.Collection('encounters');

var schema = {
  'patient._id': {
    type: String,
    trim: true
  },
  'patient.name': {
    type: String,
    trim: true
  },
  start: {
  	type: Date
  },
  end: {
  	type: Date,
    optional: true
  },
  'user._id': {
    type: String,
    trim: true
  },
  'user.name': {
    type: String,
    trim: true
  }
};

Encounters.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  Encounters.allow({
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