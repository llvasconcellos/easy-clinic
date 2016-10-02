if (Meteor.isClient) {

  var getUserLanguage = function () {
    var language = window.navigator.language.substr(0, 2);
    if (language == 'en') return language;
    else return window.navigator.language;
  };

  UserLanguage = getUserLanguage();

  T9n.setLanguage(UserLanguage);

  Meteor.startup(function () {
    TAPi18n.setLanguage(UserLanguage).done(function () {
        //Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });

      if(navigator.userAgent.indexOf("armv7l")>-1)
        $("body").addClass("raspberry-pi");
  });

}

// Meteor.startup(function () {
// WebApp.rawConnectHandlers.use(function(req, res, next)
//   {
//     console.log(req);
//     // res.setHeader("X-Clacks-Overhead", "GNU Terry Pratchett");
//     // return next();
//   })
// });


/*

Changing language
To set and change the language that a user is seeing, you should call TAPi18n.setLanguage(fn), where fn is a (possibly reactive) function that returns the current language. For instance you could write


// A store to use for the current language
export const CurrentLanguage = new ReactiveVar('en');


import CurrentLanguage from '../stores/current-language.js';
TAPi18n.setLanguage(() => {
  CurrentLanguage.get();
});
Then somewhere in your UI you can CurrentLanguage.set('es') when a user chooses a new language.

*/