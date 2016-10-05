var getUserLanguage = function () {
  var language = window.navigator.language.substr(0, 2);
  if (language == 'en') return language;
  else return window.navigator.language;
};
UserLanguage = getUserLanguage();

T9n.setLanguage(UserLanguage);

TAPi18n.setLanguage(UserLanguage).done(function () {
	//Session.set("showLoadingIndicator", false);
}).fail(function (error_message) {
	// Handle the situation
	console.log(error_message);
});