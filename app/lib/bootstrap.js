getUserLanguage = function () {
  var language = window.navigator.language.substr(0, 2);
  //return language;
  return 'pt-BR';
};

if (Meteor.isClient) {
  Meteor.startup(function () {
    TAPi18n.setLanguage(getUserLanguage()).done(function () {
        //Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}





/*

Changing language
To set and change the language that a user is seeing, you should call TAPi18n.setLanguage(fn), where fn is a (possibly reactive) function that returns the current language. For instance you could write

1
2
3
4
5
6
7
8
// A store to use for the current language
export const CurrentLanguage = new ReactiveVar('en');


import CurrentLanguage from '../stores/current-language.js';
TAPi18n.setLanguage(() => {
  CurrentLanguage.get();
});
Then somewhere in your UI you can CurrentLanguage.set('es') when a user chooses a new language.

*/