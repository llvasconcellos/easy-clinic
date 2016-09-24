Router.configure({
  layoutTemplate: 'mainLayout',
  //loadingTemplate: 'Loading', #TODO: Loading Template? Do we need one?
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'index',
  controller: 'indexController',
  where: 'client'
});

Router.route('/login', {
  name: 'login',
  controller: 'loginController',
  layoutTemplate: 'blankLayout',
  where: 'client'
});

Router.route('/register', function () {
  this.layout('blankLayout');
  this.render('login');
  AccountsTemplates.setState('signUp');
},{
  name: 'register'
});

Router.route('/resend-verification-link', function () {
  this.layout('blankLayout');
  this.render('login');
  AccountsTemplates.setState('resendVerificationEmail');
},{
  name: 'resend-verification-link'
});

Router.route('/#/verify-email/:token', function () {
  console.log(error.reason);
  Accounts.verifyEmail( params.token, (error) =>{
    if (error) {
      //Bert.alert(error.reason, 'danger');
      console.log(error.reason);
    } else {
      console.log("email verified");
      //Router.go('resend-verification-link');
      //Bert.alert('Email verified! Thanks!', 'success');
    }
  });
});

Router.route('/notFound', function () {
  this.layout('blankLayout');
  this.render('notFound');
},{
  name: 'notFound'
});

Router.route('/privacy', function () {
  this.layout('blankLayout');
  this.render('privacy');
},{
  name: 'privacy'
});

Router.route('/terms-of-use', function () {
  this.layout('blankLayout');
  this.render('terms');
},{
  name: 'terms'
});

Router.route('/email-confirmation', function () {
  this.layout('blankLayout');
  this.render('emailConfirmation');
},{
  name: 'email-confirmation'
});

// All the other routes: notFound
Router.route('/(.*)', {
  name: 'allElse',
  action: function() {
    this.redirect('notFound');
  }
});

//Before executing the route, some security validations
Router.onBeforeAction(function (route, something, someFn) {
  if (!Meteor.userId()) {
    this.redirect('login');
  } else {
    this.next();
  }

  // Don't allow users without email verification
  if (Meteor.user() && !Meteor.user().emails[0].verified) {
    Accounts.logout();
    // this.layout('blankLayout');
    // this.render('emailConfirmation');
    this.redirect('email-confirmation');
  } else {
    this.next();
  }
},{
  except: [
  'login', 
  'register', 
  'notFound', 
  'privacy', 
  'terms-of-use', 
  'email-confirmation', 
  'resend-verification-link',
  'verify-email',
  'allElse'
]});

