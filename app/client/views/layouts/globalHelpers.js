Template.registerHelper("isMobile", function () {
	if ((Meteor.isCordova) || (Meteor.Device.isPhone()) || (Meteor.Device.isTablet())){
		return true;
	} else {
		return false;
	}
});