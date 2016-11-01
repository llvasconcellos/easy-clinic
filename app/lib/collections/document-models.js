DocumentModels = new Mongo.Collection('document-models');

var schema = {
  name: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    allowedValues: ['prescription', 'medical_certificate', 'exam_request'],
    label: function() {
      return TAPi18n.__('document-models_type');
    },
    autoform: {
      firstOption: function() {
        return TAPi18n.__('common_firstOption');
      },
      options: [{
        value: 'prescription',
        "data-icon": "fa-file-text",
        label: function() {
          return TAPi18n.__('common_prescription');
        }
      },{
        value: 'medical_certificate',
        "data-icon": "fa-file-text-o",
        label: function() {
          return TAPi18n.__('common_medical-certificate');
        }
      },{
        value: 'exam_request',
        "data-icon": "fa-eye",
        label: function() {
          return TAPi18n.__('common_exam-request');
        }
      }]
    }
  },
  model: {
    type: String,
    label: function() {
      return TAPi18n.__('document-models_document-model');
    },
    autoform: {
      type: 'textarea',
      rows: 20
    }
  },
};

DocumentModels.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  DocumentModels.allow({
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