import '/imports/startup/user-accounts-config.js';
//import '/imports/startup/routes.js';

// #TODO: add this to environment variable
process.env.MAIL_URL = "smtp://***REMOVED***@email-smtp.us-west-2.amazonaws.com:587";
process.env.ROOT_URL = "https://clinicafacil.devhouse.com.br";

Meteor.startup(function () {
	//SimpleSchema.i18n("/i18n");
	//require('/imports/startup/app-cache-config.js');
});
