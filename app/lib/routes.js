Router.configure({
  layoutTemplate: 'mainLayout',
  //loadingTemplate: 'Loading',
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
});

Router.route('/notFound', function () {
  this.layout('blankLayout');
  this.render('notFound');
});

Router.route('/privacy', function () {
  this.layout('blankLayout');
  this.render('privacy');
});

Router.route('/terms-of-use', function () {
  this.layout('blankLayout');
  this.render('terms');
});

Router.route('/(.*)', {
  name: 'allElse',
  action: function() {
    this.redirect('notFound');
  }
});

Router.onBeforeAction(function (route, something, someFn) {
  if (!Meteor.userId()) {
    this.redirect('login');
  } else {
    this.next();
  }
}, { except: ['login', 'register', 'notFound', 'privacy', 'terms-of-use', 'allElse'] });