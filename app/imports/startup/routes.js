// Verify user-accounts-config.js to accounts specific routes

Router.configure({
  layoutTemplate: 'mainLayout',
  //loadingTemplate: 'Loading', #TODO: Loading Template? Do we need one?
  //loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'index',
  controller: 'indexController',
  where: 'client'
});

Router.route('/users', {
  name: 'users',
  controller: 'userController',
  where: 'client'
});

Router.route('/patients/create', {
  name: 'createPatient',
  controller: 'patientController',
  action: 'create',
  where: 'client'
});

Router.route('/patients/list', {
  name: 'listPatients',
  controller: 'patientController',
  action: 'list',
  where: 'client'
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

//All the other routes: notFound
Router.route('/(.*)', {
  name: 'allElse',
  action: function() {
    this.redirect('notFound');
  }
});

//Before executing the route, some security validations
Router.onBeforeAction(function (route, something, someFn) {
  if (!Meteor.userId()) {
    this.redirect('signIn');
  } else {
    this.next();
  }

// // Don't allow users without email verification
// if (Meteor.user() && !Meteor.user().emails[0].verified) {
//   Accounts.logout();
//   // this.layout('blankLayout');
//   // this.render('emailConfirmation');
//   //this.redirect('email-confirmation');
//   //this.redirect('verifyEmail');
// } else {
//   this.next();
// }
},{
  except: [
  'signIn', 
  'signUp', 
  'forgotPwd',
  'changePwd',
  'resetPwd',
  'verifyEmail',
  'notFound', 
  'privacy', 
  'terms-of-use', 
  'allElse'
]});