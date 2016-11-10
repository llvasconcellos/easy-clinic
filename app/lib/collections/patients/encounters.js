Encounters = new Mongo.Collection('encounters');

var userSchema = {
	_id: {
		type: String,
		trim: true
	},
	name: {
		type: String,
		trim: true
	}
};

var patientSchema = {
	_id: {
		type: String,
		trim: true
	},
	name: {
		type: String,
		trim: true
	}
};

var schema = {
  patient: {
    type: patientSchema,
  },
  start: {
  	type: Date
  },
  end: {
  	type: Date
  },
  user: {
  	type: userSchema
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