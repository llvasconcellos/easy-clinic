Template.navigation.rendered = function(){
	// Initialize metisMenu
	$('#side-menu').metisMenu();

	if(Meteor.user()) {
		var email = Meteor.user().emails[0].address;
		var url = Gravatar.imageUrl(email, {
			size: 50,
			default: 'images/default-user-image.png'
		});
		$('#mini-profile-img').attr('src', url);
	}
};