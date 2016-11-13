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
  subscriptions: function(params) {
    this.register('schedule', Meteor.subscribe('schedule'));
  },
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
    this.register('settings', Meteor.subscribe('settings'));
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
    this.register('formModels', Meteor.subscribe('formModels'));
    this.register('document-models', Meteor.subscribe('documentModels'));
    this.register('patient-records', Meteor.subscribe('patientRecords', params._id));
    this.register('settings', Meteor.subscribe('settings'));
    this.register('patient-encounters', Meteor.subscribe('patient-encounters', params._id));
    this.register('patient-schedule', Meteor.subscribe('patient-encounters', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "patientForm"});
  }
});

var reportRoutes = FlowRouter.group({
  prefix: '/reports',
  name: 'reports'
});

reportRoutes.route('/encounters', {
  name: 'reportEncounters',
  subscriptions: function(params) {
    this.register('encounters', Meteor.subscribe('encounters'));
  },
  action: function() {
    BlazeLayout.render('mainLayout', {content: 'reportEncounters'});
  }
});

FlowRouter.route('/settings', {
  name: 'settingsForm',
  subscriptions: function(params) {
    this.register('settings', Meteor.subscribe('settings'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "settingsForm"});
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

FlowRouter.route('/document-models', {
  name: 'documentModelList',
  subscriptions: function(params) {
    this.register('document-models', Meteor.subscribe('documentModels'));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "documentModelList"});
  }
});

FlowRouter.route('/document-models/create', {
  name: 'documentModelCreate',
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "documentModelForm"});
  }
});

FlowRouter.route('/document-models/:_id', {
  name: 'documentModelEdit',
  subscriptions: function(params) {
    this.register('document-model', Meteor.subscribe('singleDocumentModel', params._id));
  },
  action: function(params, queryParams) {
    BlazeLayout.render("mainLayout", {content: "documentModelForm"});
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





///////////////////////////////////////////////////////////////////////
// #TODO: make this a import


// Prevent routing when there are unsaved changes
// ----------------------------------------------

// This function will be called on every route change.
// Return true to 'prevent' the route from changing.
preventRouteChange = function(targetContext) {
  if (Session.get('unsavedChanges')) {
    if (!window.confirm('Unsaved changes will be lost. Are you sure?')) {
      return true;
    }
    Session.set('unsavedChanges', false);
  }
  return false;
}

// Workaround FlowRouter to provide the ability to prevent route changes
var previousPath,
  isReverting,
  routeCounter = 0,
  routeCountOnPopState;

window.onpopstate = function () {
  // For detecting whether the user pressed back/forward button.
  routeCountOnPopState = routeCounter;
};

FlowRouter.triggers.exit([function (context, redirect, stop) {
  // Before we leave the route, cache the current path.
  previousPath = context.path;
}]);

FlowRouter.triggers.enter([function (context, redirect, stop) {
  routeCounter++;

  if (isReverting) {
    isReverting = false;
    // This time, we are simply 'undoing' the previous (prevented) route change.
    // So we don't want to actually fire any route actions.
    stop();
  }
  else if (preventRouteChange(context)) {
    // This route change is not allowed at the present time.

    // Prevent the route from firing.
    stop();

    isReverting = true;

    if (routeCountOnPopState == routeCounter - 1) {
      // This route change was due to browser history - e.g. back/forward button was clicked.
      // We want to undo this route change without overwriting the current history entry.
      // We can't use redirect() because it would overwrite the history entry we are trying
      // to preserve.

      // setTimeout allows FlowRouter to finish handling the current route change.
      // Without it, calling FlowRouter.go() at this stage would cause problems (we would
      // ultimately end up at the wrong URL, i.e. that of the current context).
      setTimeout(function () {
        FlowRouter.go(previousPath);
      });
    }
    else {
      // This is a regular route change, e.g. user clicked a navigation control.
      // setTimeout for the same reasons as above.
      setTimeout(function () {
        // Since we know the user didn't navigate using browser history, we can safely use
        // history.back(), keeping the browser history clean.
        history.back();
      });
    }
  }
}]);