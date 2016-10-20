Certificates = new Mongo.Collection('certificates');

var schema = {
  name: {
    type: String,
    trim: true
  },
  certificate: {
    type: String,
    label: function() {
      return TAPi18n.__('certificates_certificate');
    },
    autoform: {
      type: 'textarea',
      rows: 20
    }
  },
};

Certificates.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  Certificates.allow({
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