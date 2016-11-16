Meteor.methods({
	updateUser: function (userId, newPassword, data) {
		if(Roles.userIsInRole(Meteor.userId(), 'super-admin')) {
			if (userId){
				var user = Meteor.users.findOne({_id: userId});
				if((user.emails[0].address === 'leo.lima.web@gmail.com') && 
					(Meteor.userId() != userId)){
					throw new Meteor.Error(TAPi18n.__('common_access-denied'), TAPi18n.__('common_access-denied-message'));
				}
				Meteor.users.update(userId, {$set: data});
				if (newPassword) {
					Accounts.setPassword(userId, newPassword);
				}
				Roles.setUserRoles(userId, []);
				Roles.addUsersToRoles(userId, ['default', data['profile.group']]);
				if(data["isSuperAdmin"]){
					Roles.addUsersToRoles(userId, ['super-admin']);
				}
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
					},
				});
				Roles.addUsersToRoles(userId, ['default', data['profile.group']]);
				if(data["isSuperAdmin"]){
					Roles.addUsersToRoles(userId, ['super-admin']);
				}
				Meteor.users.update(userId, {$set: {
					isUserEnabled: data["isUserEnabled"],
					isSuperAdmin: data["isSuperAdmin"]
				}});
				Accounts.sendEnrollmentEmail(userId);
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
	testPatientImport: function(data) {
		check(data, Array);
		var errors = [];
		for ( let i = 0; i < data.length; i++ ) {
			let item   = data[ i ];
			try {
				ImportPatients.insert(item);
			}
			catch(e){
				if(e.sanitizedError) {
					errors[i] = {details: e.sanitizedError.details, message: e.message};
				}
				else {
					throw error;
				}
			}
		}
		ImportPatients.remove({});
		return errors;
	},
	patientImport: function(data) {
		check(data, Array);
		for ( let i = 0; i < data.length; i++ ) {
			let item   = data[ i ];
			try{
				if(item['picture']) {
					var picture = item['picture'];
					if(item['picture'].indexOf('mime64:/') != -1) {
						picture = picture.replace('mime64:/', '');
					}
					item['picture'] = null;
					var patient = Patients.insert(item);
					Patients.addPicture(picture, patient);
				}
				else {
					Patients.insert(item);
				}
			}
			catch(e) {
				console.log(e.message);
			}
		}
		return TAPi18n.__('common_save-success');
	},
	doMapReduce: function(patientId){
		var map = function () {
			emit(this.date, this);
		};

		var reduce = function (key, value) {
			var records = [];
			for(var i = 0; i < value.length; i++ ){
				records.push(value[i].record);
			}
			return {
				date: value.date, 
				patientId: value.patientId, 
				records: records
			};
		};

		var rawPatientRecords = PatientRecords.rawCollection();

		var syncMapReduce = Meteor.wrapAsync(rawPatientRecords.mapReduce, rawPatientRecords);

		var CollectionName = syncMapReduce(map, reduce, {
			out : {inline: 1},
		 	sort : {date : 1}
		});

		// db.getCollection('patient-records').mapReduce(function(){
		// 	emit(this.date, this);
		// }, function(key, value){
		// 	var records = [];
		// 	for(var i = 0; i < value.length; i++ ){
		// 		records.push(value[i].record);
		// 	}
		// 	return {date: value.date, patientId: value.patientId, records: records};
		// }, {
		// 	out : {inline: 1} ,
		// 	//query : {type : 2} , 
		// 	sort : {date : 1}
		// });

		return CollectionName;
	}
});