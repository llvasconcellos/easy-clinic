/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
	updateUser: function (userId, newPassword, data) {
		if(Roles.userIsInRole(Meteor.userId(), 'super-admin')) {
			Meteor.users.update(userId, {$set: data});
			if (newPassword) {
				Accounts.setPassword(userId, newPassword);
			}
		}
		//throw new Meteor.Error("logged-out", "The user must be logged in to post a comment.");
		return TAPi18n.__('common_save-success');
	}
});
