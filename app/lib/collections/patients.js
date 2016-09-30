Patients = new Mongo.Collection('patients');


var schema = {
  name: {
    type: String,
    trim: true,
    max: 100
  },
  bed: {
    type: String,
    trim: true,
    optional: true,
    max: 30
  },
  records: {
    type: String,
    trim: true,
    optional: true,
    max: 30
  },
  createdAt: {
    type: Date,
    min: new Date()
  },
  dateOfBirth: {
    type: Date,
    optional: true,
  },
  enabled: {
    type: Boolean,
    defaultValue: true
  },
  healthInsurance: {
    type: String,
    trim: true,
    optional: true,
    max: 30
  },
  healthInsurance: {
    type: String,
    trim: true,
    optional: true,
    max: 100
  },
  code: {
    type: String,
    trim: true,
    optional: true,
    max: 50
  },
  code: {
    type: String,
    trim: true,
    optional: true,
    max: 50
  },
  gender: {
    type: String,
    allowedValues: ['M', 'F']
  },
  maritalStatus: {
    type: String,
    allowedValues: ['Single', 'Married','Life Partner', 'Separated', 'Divorced', 'Widowed']
  },
  skinColor: {
    type: String,
    allowedValues: ['White', 'Brown', 'Black', 'Mixed', 'Other']
  },
  placeOfBirth: {
    type: String,
    trim: true,
    optional: true,
    max: 100
  },
  literacy: {
    type: String,
    allowedValues: ['Illiterate', 'Primary School', 'High School','Graduated', 'Master', 'Doctor', 'PhD']
  },
  CPF: { // #TODO: international documents
    type: String,
    trim: true,
    optional: true,
    max: 11
  },
  titularCPF: {
    type: String,
    trim: true,
    optional: true,
    max: 11
  },
  occupation: {
    type: String,
    trim: true,
    optional: true,
    max: 100
  },
  prevRetorno: {
    type: String,
    trim: true,
    optional: true,
    max: 50
  },
  prevRetorno: {
    type: String,
    trim: true,
    optional: true,
    max: 50
  },
  email: {
    type: String,
    trim: true,
    optional: true,
    max: 255
  },
  phone: {
    type: String,
    trim: true,
    optional: true,
    max: 30
  },
  mobile: {
    type: String,
    trim: true,
    optional: true,
    max: 30
  },
  // #TODO: address fields per country ISSUEID #43
  streetAddress_1: {
    type: String,
    trim: true,
    optional: true,
    max: 255
  },
  streetAddress_2: {
    type: String,
    trim: true,
    optional: true,
    max: 255
  },
  bairro: {
    type: String,
    trim: true,
    optional: true,
    max: 255
  },
  city: {
    type: String,
    trim: true,
    optional: true,
    max: 255
  },
  state: {
    type: String,
    trim: true,
    optional: true,
    max: 2
  },
  zip: {
    type: String,
    trim: true,
    optional: true,
    max: 20
  },
  obs: {
    type: String,
    optional: true
  },
};

Patients.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
  Patients.allow({
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

  // Patients.deny({
  //   insert: function (userId, doc) {
  //     return true;
  //   },

  //   update: function (userId, doc, fieldNames, modifier) {
  //     return true;
  //   },

  //   remove: function (userId, doc) {
  //     return true;
  //   }
  // });
}
