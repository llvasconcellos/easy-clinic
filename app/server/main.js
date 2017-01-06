import '/imports/startup/user-accounts-config.js';
//import '/imports/startup/routes.js';

Meteor.startup(function () {
	//SimpleSchema.i18n("/i18n");
	//require('/imports/startup/app-cache-config.js');
	SyncedCron.start();
});
