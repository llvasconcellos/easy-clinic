Meteor.publish(null, function (){
  return Meteor.roles.find({})
})

Meteor.publish('users', function() {
	if(Roles.userIsInRole(this.userId, 'super-admin')) {
		return Meteor.users.find({});
	}
});

Meteor.publish('singleUser', function (id) {
  return Meteor.users.find({_id: id});
});

Meteor.publish('doctors', function (id) {
  return Meteor.users.find({'profile.group':'medical_doctor'});
});

Meteor.publish('singleDoctor', function (id) {
  return Meteor.users.find({_id: id});
});

Meteor.publish('patients', function () {
  return Patients.find();
});

Meteor.publish('singlePatient', function (id) {
  return Patients.find({_id: id});
});

Meteor.publish('patientRecords', function (id) {
  return PatientRecords.find({patientId: id});
});

Meteor.publish('importPatients', function () {
  return ImportPatients.find();
});

Meteor.publish('specialties', function () {
  return Specialties.find();
});

Meteor.publish('singleSpecialty', function (id) {
  return Specialties.find({_id: id});
});

Meteor.publish('schedule', function () {
  return Schedule.find();
});

Meteor.publish('settings', function () {
  return Settings.find();
});

Meteor.publish('drugs', function () {
  return Drugs.find();
});

Meteor.publish('singleDrug', function (id) {
  return Drugs.find({_id: id});
});

Meteor.publish('icd10', function () {
  return ICD10.find();
});

Meteor.publish('documentModels', function () {
  return DocumentModels.find();
});

Meteor.publish('singleDocumentModel', function (id) {
  return DocumentModels.find({_id: id});
});

Meteor.publish('formModels', function () {
  return FormModels.find();
});

Meteor.publish('singleFormModel', function (id) {
  return FormModels.find({_id: id});
});