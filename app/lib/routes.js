Router.configure({
  //layoutTemplate: 'blankLayout',
  //loadingTemplate: 'Loading',
  notFoundTemplate: 'notFoundTemplate'
});


Router.route('/', {
  name: 'index',
  controller: 'indexController',
  where: 'client'
});


Router.onBeforeAction(function () {
  // all properties available in the route function
  // are also available here such as this.params

  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('blankLayout', {data: function () {
      return {content: 'login'};
    }
  });
  } else {
    // otherwise don't hold up the rest of hooks or our route/action function
    // from running
    this.next();
  }
});

/*
Router.route('/', {
    action: function() {
      Router.go('/dashboard');
    }
});

Router.route('/login', {
    action: function() {
        BlazeLayout.render("blankLayout", {content: "login"});
    }
});

Router.route('/dashboard', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "home"});
    }
});

Router.route('/pagina2', {
    action: function() {
        BlazeLayout.render("mainLayout", {content: "pagina2"});
    }
});
*/