FormModels = new Mongo.Collection('form-models');

var schema = {
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    autoform: {
      type: 'textarea',
      rows: 5
    }
  },
  model: {
    type: [Object],
    blackbox: true
  },
};

FormModels.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  FormModels.allow({
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