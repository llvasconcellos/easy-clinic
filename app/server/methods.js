/*****************************************************************************/
/*  Server Methods */
/*****************************************************************************/

Meteor.methods({
	updateUser: function (userId, data) {
		if(Roles.userIsInRole(Meteor.userId(), 'super-admin')) {
			//Meteor.users.update(user._id, {$set: data});
			Meteor.users.update(userId, {$set: data});
		}
	}
});
