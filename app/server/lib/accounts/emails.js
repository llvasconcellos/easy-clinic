Accounts.emailTemplates.siteName = "Clínica Fácil";
Accounts.emailTemplates.from = "Clínica Fácil <contato@devhouse.com.br>"; // #TODO: make this a config setting
Accounts.emailTemplates.verifyEmail = {
	from: function(user) {
		T9n.setLanguage(user.profile.language);
		return T9n.get('appName') + " <contato@devhouse.com.br>"; // #TODO: make this a config setting
	},
	subject: function(user) {
		T9n.setLanguage(user.profile.language);
		return T9n.get('verifyEmailSubject', true, {
			appName: T9n.get('appName')
		});
	},
	text: function(user, url) {
		T9n.setLanguage(user.profile.language);
		return T9n.get('verifyEmailBody', true, {
			emailAddress: user.emails[0].address,
			name: user.profile.firstName,
			url: url,
			supportEmail: "contato@devhouse.com.br" // #TODO: make this a config setting
		});
	}
};
Accounts.emailTemplates.resetPassword = {
	from: function(user) {
		T9n.setLanguage(user.profile.language);
		return T9n.get('appName') + " <contato@devhouse.com.br>"; // #TODO: make this a config setting
	},
	subject: function(user) {
		T9n.setLanguage(user.profile.language);
		return T9n.get('resetPasswordEmailSubject', true, {
			appName: T9n.get('appName')
		});
	},
	text: function(user, url) {
		T9n.setLanguage(user.profile.language);
		return T9n.get('resetPasswordEmailBody', true, {
			name: user.profile.firstName,
			url: url // #TODO: improve this emails and add html support
		});
	}
};
// Accounts.emailTemplates.enrollAccount = {}; => Same as resetPassword, but for verifying the users email address.