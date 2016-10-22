Meteor.methods({
	updateUser: function (userId, newPassword, data) {
		if(Roles.userIsInRole(Meteor.userId(), 'super-admin')) {
			if (userId){
				Meteor.users.update(userId, {$set: data});
				if (newPassword) {
					Accounts.setPassword(userId, newPassword);
				}
				Roles.setUserRoles(userId, []);
				Roles.addUsersToRoles(userId, ['default', data.group, 'super-admin']);
			}
			else {
				 var userId = Accounts.createUser({
					email : data['emails.0.address'],
					password : newPassword,
					profile  : {
						firstName: data['profile.firstName'],
						lastName: data['profile.lastName'],
						group: data['profile.group'],
						language: data['profile.language']
					}
				});
				Roles.addUsersToRoles(userId, ['default', data.group, 'super-admin']); // #TODO: remove super-admin
				Meteor.users.update(userId, {$set: {isUserEnabled: true}});
			}
		}
		else {
			throw new Meteor.Error(TAPi18n.__('common_access-denied'), TAPi18n.__('common_access-denied-message'));
		}
		return TAPi18n.__('common_save-success');
	},
	doctorSpecialtyHours: function (userId, data) {
		if(!Roles.userIsInRole(Meteor.userId(), 'super-admin')) {
			throw new Meteor.Error(TAPi18n.__('common_access-denied'), TAPi18n.__('common_access-denied-message'));
			return;
		}
		if (userId) {
			Meteor.users.update(userId, {$set: data});
		}
		return TAPi18n.__('common_save-success');
	},
	saveScheduleEvent: function (event, eventId) {
		if(!eventId){
			var scheduleEvent = Schedule.insert(event);
			return scheduleEvent;
		}
		else {
			Schedule.update(eventId, {$set: {
				title: event.title,
				patient: event.patient
			}});
			return TAPi18n.__('common_save-success');
		}
	},
	deleteScheduleEvent: function(event) {
		Schedule.remove(event);
		return TAPi18n.__('common_save-success');
	},
	testPatientImport: function(data) {
		check(data, Array);

		var errors = [];
		for ( let i = 0; i < data.length; i++ ) {
			let item   = data[ i ];
			try {
				ImportPatients.insert(item);
			}
			catch(e){
				errors[i] = {details: e.sanitizedError.details, message: e.message};
			}
		}
		ImportPatients.remove({});
		return errors;
	},
	patientImport: function(data) {
		check(data, Array);
		for ( let i = 0; i < data.length; i++ ) {
			let item   = data[ i ];
			Patients.insert(item);
		}
		return TAPi18n.__('common_save-success');
	}
});