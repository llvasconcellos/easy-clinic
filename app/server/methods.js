/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

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
						lastName: data['profile.lastName']
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
	}
});