Drugs = new Mongo.Collection('drugs');

var schema = {
  name: {
    type: String,
    trim: true
  },
  commercial_name: {
    type: String,
    trim: true,
    optional: true
  },
  generic_name: {
    type: String,
    trim: true,
    optional: true
  },
  special_prescription: {
    type: Boolean,
  },
  popular_pharmacy_name: {
    type: String,
    trim: true,
    optional: true
  },
  search: {
    type: String,
    trim: true,
    optional: true,
    autoform: {
      type: 'textarea',
      rows: 10
    }
  },
  html: {
    type: String,
    trim: true,
    optional: true,
    autoform: {
      type: 'textarea',
      rows: 20
    }
  },
};

if (Meteor.isClient) {
  schema.name.label = function() {
    return TAPi18n.__('drugs_name');
  };
  schema.commercial_name.label = function() {
    return TAPi18n.__('drugs_commercial_name');
  };
  schema.generic_name.label = function() {
    return TAPi18n.__('drugs_generic_name');
  };
  schema.special_prescription.label = function() {
    return TAPi18n.__('drugs_special_prescription');
  };
  schema.popular_pharmacy_name.label = function() {
    return TAPi18n.__('drugs_popular_pharmacy_name');
  };
  schema.search.label = function() {
    return TAPi18n.__('drugs_search');
  };
  schema.html.label = function() {
    return TAPi18n.__('drugs_html');
  };
}

Drugs.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  Drugs.allow({
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