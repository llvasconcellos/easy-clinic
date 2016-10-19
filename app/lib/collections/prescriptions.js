Prescriptions = new Mongo.Collection('prescriptions');

var schema = {
  name: {
    type: String,
    trim: true
  },
  prescription: {
    type: String,
    label: function() {
      return TAPi18n.__('prescriptions_prescription');
    },
    autoform: {
      type: 'textarea',
      rows: 20
    }
  },
};

Prescriptions.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  Prescriptions.allow({
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