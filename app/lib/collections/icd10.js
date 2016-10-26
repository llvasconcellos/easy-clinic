ICD10 = new Mongo.Collection('icd10');

var schema = {
  icd: {
    type: String,
    trim: true
  },
};

if (Meteor.isClient) {
  //var icd10Observer = new PersistentMinimongo2(ICD10, 'icd10');
  
  schema.icd.label = function() {
    return TAPi18n.__('common_icd');
  };
}

ICD10.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  ICD10.allow({
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