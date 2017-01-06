if (Meteor.users.find().count() === 0) {

	var users = [{
		email : "leo.lima.web@gmail.com",
		password: "123456",
		firstName: "Leonardo",
        lastName: "Lima de Vasconcellos",
        group: "medical_doctor",
        language: "en",
        isSuperAdmin: true,
        isUserEnabled: true
	}];

	_.each(users, function(doc) { 
		addUser(doc);
	});
}

function addUser(data){
	 var userId = Accounts.createUser({
		email : data.email,
		password : data.password,
		profile  : {
			firstName: data.firstName,
			lastName: data.lastName,
			group: data.group,
			language: data.language
		},
	});
	Roles.addUsersToRoles(userId, ['default', data.group]);
	if(data.isSuperAdmin){
		Roles.addUsersToRoles(userId, ['super-admin']);
	}
	Meteor.users.update(userId, {$set: {
		isUserEnabled: data.isUserEnabled,
		isSuperAdmin: data.isSuperAdmin
	}});
	Accounts.sendEnrollmentEmail(userId);
}