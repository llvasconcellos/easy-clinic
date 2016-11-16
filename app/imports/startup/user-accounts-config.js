AccountsTemplates.configure({
  confirmPassword: false,
  focusFirstInput: true, //!Meteor.isCordova
  showForgotPasswordLink: true,
  showLabels: false,
  continuousValidation: true,
  negativeFeedback: true,
  negativeValidation: true,
  positiveValidation: true,
  positiveFeedback: true,
  showValidating: true,
  privacyUrl: 'privacy',
  termsUrl: 'terms-of-use',
  enablePasswordChange: true,
  sendVerificationEmail: true,
  enforceEmailVerification: true,
  showResendVerificationEmailLink: true,
  forbidClientAccountCreation: true,

  // meteor-useraccounts/flow-routing
  defaultLayoutType: 'blaze',
  defaultTemplate: 'login',
  defaultLayout: 'blankLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'content',
  defaultState: 'signIn',

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 4000,

  // Hooks
  //onLogoutHook: function() {},
  //onSubmitHook: function(error, state) {},
  preSignUpHook: function (password, info) {
    info.profile.language = TAPi18n.getLanguage();
  },
  postSignUpHook: function(userId, info) {
    Roles.addUsersToRoles(userId, ['default', info.profile.group]);
    Meteor.users.update(userId, {
      $set: {
        isUserEnabled: false
      }
    });
  }
});

// meteor-useraccounts/flow-routing
AccountsTemplates.configureRoute('signIn', {
  name: 'signIn',
  path: '/sign-in',
  redirect: '/',
});
/*AccountsTemplates.configureRoute('signUp', {
  name: 'signUp',
  path: '/sign-up'
});*/
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  path: '/forgot-password'
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'changePwd',
  path: '/change-password'
});
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  path: '/reset-password'
});
AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail',
  path: '/verify-email'
});
AccountsTemplates.configureRoute('enrollAccount', {
  name: 'enrollAccount',
  path: '/enroll-account'
});
AccountsTemplates.configureRoute('resendVerificationEmail', {
  name: 'resendVerificationEmail',
  path: '/send-again'
});


if (Meteor.isClient) {
  Template['atSelectInputOverride'].replaces('atSelectInput');
  Template['atPwdFormBtnOverride'].replaces('atPwdFormBtn');
  // Accounts.onLogout(function(){
  //   FlowRouter.redirect('signIn');
  // });
  // Accounts.onLogin(function(){
  //   Meteor.logoutOtherClients();
  // });
}

var password = AccountsTemplates.removeField('password');
var email = AccountsTemplates.removeField('email');

AccountsTemplates.addFields([{
  _id: 'firstName',
  type: 'text',
  displayName: "firstName",
  placeholder: {
    signUp: "firstName"
  },
  required: true,
  minLength: 1
},{
  _id: 'lastName',
  type: 'text',
  displayName: "lastName",
  placeholder: {
    signUp: "lastName"
  },
  required: true,
  minLength: 1
},{
 _id: "group",
  type: "select",
  showLabels: false,
  displayName: T9n.get('group'),
  required: true,
  select: [{
    text: T9n.get('group'),
    value: ""
  },{
    text: T9n.get('groupMD'),
    value: "medical_doctor"
  },{
    text: T9n.get('groupNurse'),
    value: "nurse"
  },{
    text: T9n.get('groupReception'),
    value: "recepcionist"
  },{
    text: T9n.get('groupAdmin'),
    value: "administration"
  }]
}, email, password]);

/*
,{
  _id: 'email',
  type: 'email',
  required: true,
  displayName: "email",
  re: /.+@(.+){2,}\.(.+){2,}/,
  errStr: 'invalidEmail',
},{
  _id: 'password',
  type: 'password',
  placeholder: {
      signUp: "password"
  },
  required: true,
  minLength: 8,
  re: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
  errStr: 'At least 1 digit, 1 lowercase and 1 uppercase',
}*/

if (Meteor.isServer) {
  Accounts.validateLoginAttempt(function(loginInfo){
    if(loginInfo.allowed){
      if(!loginInfo.user.isUserEnabled){
        return false;
      } else {
        return true;
      }
    }
  });
}