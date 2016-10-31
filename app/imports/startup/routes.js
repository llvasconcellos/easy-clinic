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
  name: 'patientList',
  subscriptions: function(params) {
    this.register('patients', Meteor.subscribe('patients'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "patientList"});
  }
});

FlowRouter.route('/patients/create', {
  name: 'patientCreate',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "patientForm"});
  }
});

FlowRouter.route('/patients/:_id', {
  name: 'patientEdit',
  subscriptions: function(params) {
    this.register('allimages', Meteor.subscribe('files.images.all'));
    this.register('patient', Meteor.subscribe('singlePatient', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "patientForm"});
  }
});

FlowRouter.route('/specialties', {
  name: 'specialtyList',
  subscriptions: function(params) {
    this.register('specialties', Meteor.subscribe('specialties', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "specialtyList"});
  }
});

FlowRouter.route('/specialties/create', {
  name: 'specialtyCreate',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "specialtyForm"});
  }
});

FlowRouter.route('/specialties/:_id', {
  name: 'specialtyEdit',
  subscriptions: function(params) {
    this.register('specialty', Meteor.subscribe('singleSpecialty', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "specialtyForm"});
  }
});

FlowRouter.route('/doctors', {
  name: 'doctorList',
  subscriptions: function(params) {
    this.register('doctors', Meteor.subscribe('doctors'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "doctorList"});
  }
});

FlowRouter.route('/doctors/:_id', {
  name: 'doctorEdit',
  subscriptions: function(params) {
    this.register('specialties', Meteor.subscribe('specialties'));
    this.register('doctor', Meteor.subscribe('singleDoctor', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "doctorForm"});
  }
});

FlowRouter.route('/prescriptions', {
  name: 'prescriptionList',
  subscriptions: function(params) {
    this.register('prescriptions', Meteor.subscribe('prescriptions'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "prescriptionList"});
  }
});

FlowRouter.route('/prescriptions/create', {
  name: 'prescriptionCreate',
  subscriptions: function(params) {
    this.register('drugs', Meteor.subscribe('drugs'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "prescriptionForm"});
  }
});

FlowRouter.route('/prescriptions/:_id', {
  name: 'prescriptionEdit',
  subscriptions: function(params) {
    this.register('prescription', Meteor.subscribe('singlePrescription', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "prescriptionForm"});
  }
});

FlowRouter.route('/certificates', {
  name: 'certificateList',
  subscriptions: function(params) {
    this.register('certificates', Meteor.subscribe('certificates'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "certificateList"});
  }
});

FlowRouter.route('/certificates/create', {
  name: 'certificateCreate',
  subscriptions: function(params) {
    this.register('icd10', Meteor.subscribe('icd10'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "certificateForm"});
  }
});

FlowRouter.route('/certificates/:_id', {
  name: 'certificateEdit',
  subscriptions: function(params) {
    this.register('certificate', Meteor.subscribe('singleCertificate', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "certificateForm"});
  }
});

FlowRouter.route('/icd10', {
  name: 'icd10List',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "icd10List"});
  }
});

FlowRouter.route('/drugs', {
  name: 'drugList',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "drugList"});
  }
});

FlowRouter.route('/drugs/create', {
  name: 'drugCreate',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "drugForm"});
  }
});

FlowRouter.route('/drugs/:_id', {
  name: 'drugEdit',
  subscriptions: function(params) {
    this.register('drugs', Meteor.subscribe('singleDrug', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "drugForm"});
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

FlowRouter.route('/import', {
  name: 'import',
  subscriptions: function(params) {
    this.register('importPatients', Meteor.subscribe('importPatients'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "import"});
  }
});

FlowRouter.route('/form-models', {
  name: 'formModelsList',
  subscriptions: function(params) {
    this.register('formModels', Meteor.subscribe('formModels'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "formModelsList"});
  }
});

FlowRouter.route('/form-models/create', {
  name: 'formModelCreate',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "formModelsForm"});
  }
});

FlowRouter.route('/form-models/:_id', {
  name: 'formModelEdit',
  subscriptions: function(params) {
    this.register('formModel', Meteor.subscribe('singleFormModel', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "formModelsForm"});
  }
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('blankLayout', {content: 'notFound'});
  }
};