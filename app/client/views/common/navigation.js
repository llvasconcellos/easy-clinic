Template.navigation.rendered = function(){
	// Initialize metisMenu
	$(document).ready(function() {
		Meteor.setTimeout(function(){
			//#TODO: see why the settings menu does not work and ditch this timeout hack
			$('#side-menu').metisMenu();
		}, 1000);
	});
	
	this.autorun(function(c) {
		if(Meteor.user()) {
			var email = Meteor.user().emails[0].address;
			var url = Gravatar.imageUrl(email, {
				secure: true,
				size: 50,
				//default: Meteor.absoluteUrl() + 'images/default-user-image.png'
				default: 'https://cdn4.iconfinder.com/data/icons/medical-14/512/9-128.png'
			});
			$('#mini-profile-img').attr('src', url);
			c.stop();
		}
	});
};

Template.navigation.events({
	'click .hide-on-phone': function (event, template) {
		if(Meteor.Device.isPhone()) {
			$("body").toggleClass("mini-navbar");
			$('#side-menu').hide();
			setTimeout(function () {
				$('#side-menu').fadeIn(400);
			}, 200);
		}
	}
});