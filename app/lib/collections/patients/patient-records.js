PatientRecords = new Mongo.Collection('patient-records');

var schema = {
	date: {
		type: Date,
	},
	patientId: {
		type: String
	},
	record: {
		type: [Object],
		blackbox: true
	}
};

PatientRecords.attachSchema(new SimpleSchema(schema));

if (Meteor.isServer) {
	PatientRecords.allow({
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