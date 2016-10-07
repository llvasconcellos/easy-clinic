import '/imports/startup/i18n-setup.js';
import '/imports/startup/user-accounts-config.js';
import '/imports/startup/routes.js';

Meteor.startup(function () {
    // add raspberry pi css class to change colors #TODO: use a proper user agent
    if(navigator.userAgent.indexOf("armv7l")>-1) {
      $("body").addClass("raspberry-pi");
    }

    // add phone specific css class 
    if(Meteor.Device.isPhone()) {
    	$("body").addClass("is-phone");
    }
});