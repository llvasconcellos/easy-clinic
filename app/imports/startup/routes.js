// Verify user-accounts-config.js to accounts specific routes
// View this link to help setting up flow routes with Roles package
// https://medium.com/@satyavh/using-flow-router-for-authentication-ba7bb2644f42#.xi7baqsyw

FlowRouter.triggers.enter(
  [AccountsTemplates.ensureSignedIn],{
  except: [
  'signIn', 
  'signUp', 
  'forgotPwd',
  'changePwd',
  'resetPwd',
  'verifyEmail',
  'enrollAccount',
  'resendVerificationEmail',
  'notFound', 
  'privacy', 
  'terms-of-use', 
]});

FlowRouter.route('/', {
  name: 'index',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "dashboard"});
  }
});

FlowRouter.route('/privacy', {
  name: 'privacy',
  action: function(params, queryParams) {
    BlazeLayout.render("blankLayout", {content: "privacy"});
  }
});

FlowRouter.route('/terms-of-use', {
  name: 'terms-of-use',
  action: function(params, queryParams) {
    BlazeLayout.render("blankLayout", {content: "terms"});
  }
});

FlowRouter.route('/logout', {
  name: 'logout',
  action: function(params, queryParams) {
    Meteor.logout(function(){
      FlowRouter.redirect(FlowRouter.path('signIn'));
    });
  }
});

FlowRouter.route('/schedule', {
  name: 'schedule',
  subscriptions: function(params) {
    this.register('doctors', Meteor.subscribe('doctors'));
    this.register('patients', Meteor.subscribe('patients'));
    this.register('schedule', Meteor.subscribe('schedule'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "schedule"});
  }
});

FlowRouter.route('/patients', {
  name: 'listPatients',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "patientList"});
  }
});

FlowRouter.route('/patients/create', {
  name: 'createPatient',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "patientForm"});
  }
});

FlowRouter.route('/patients/:_id', {
  name: 'editPatient',
  subscriptions: function(params) {
    this.register('allimages', Meteor.subscribe('files.images.all'));
    this.register('patient', Meteor.subscribe('singlePatient', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "patientForm"});
  }
});

FlowRouter.route('/specialties', {
  name: 'listSpecialty',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "specialtyList"});
  }
});

FlowRouter.route('/specialties/create', {
  name: 'createSpecialty',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "specialtyForm"});
  }
});

FlowRouter.route('/specialties/:_id', {
  name: 'editSpecialty',
  subscriptions: function(params) {
    this.register('specialty', Meteor.subscribe('singleSpecialty', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "specialtyForm"});
  }
});

FlowRouter.route('/doctors', {
  name: 'doctorsList',
  subscriptions: function(params) {
    this.register('doctors', Meteor.subscribe('doctors'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "doctorsList"});
  }
});

FlowRouter.route('/doctors/:_id', {
  name: 'editDoctor',
  subscriptions: function(params) {
    this.register('specialties', Meteor.subscribe('specialties'));
    this.register('doctor', Meteor.subscribe('singleDoctor', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "doctorForm"});
  }
});

FlowRouter.route('/users', {
  name: 'users',
  subscriptions: function(params) {
    this.register('users', Meteor.subscribe('users'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "users"});
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('blankLayout', {content: 'notFound'});
  }
};