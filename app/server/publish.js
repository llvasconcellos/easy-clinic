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

Meteor.publish('specialties', function () {
  return Specialties.find();
});

Meteor.publish('singleSpecialty', function (id) {
  return Specialties.find({_id: id});
});
