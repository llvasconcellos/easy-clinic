Receituario = new Mongo.Collection('receituario');

var schema = {
  name: {
    type: String,
    trim: true
  },
  receituario: {
    type: String,
    label: function() {
      return 'Receituario';
    },
    autoform: {
      type: 'textarea',
      rows: 20
    }
  },
};

Receituario.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  Receituario.allow({
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