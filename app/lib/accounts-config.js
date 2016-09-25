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

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 4000,

  // Hooks
  // onLogoutHook: myLogoutFunc,
  // onSubmitHook: mySubmitFunc,
  // preSignUpHook: myPreSubmitFunc,
  postSignUpHook: function(userId, info) {
    Roles.addUsersToRoles(userId, ['default', info.profile.group, 'super-admin']); // #TODO: remove super-admin
    Meteor.users.update(userId, {
      $set: {
        isUserEnabled: false
      }
    });
  }
});

if (Meteor.isClient) {
  Template['atSelectInputOverride'].replaces('atSelectInput');
  Template['atPwdFormBtnOverride'].replaces('atPwdFormBtn');
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
  minLength: 1,
},{
  _id: 'lastName',
  type: 'text',
  displayName: "lastName",
  placeholder: {
    signUp: "lastName"
  },
  required: true,
  minLength: 1,
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

/*
Accounts.emailTemplates.verifyEmail = {
  subject() {
    return "[Clínica Fácil] Verify Your Email Address";
  },
  text( user, url ) {
    let emailAddress   = user.emails[0].address,
        urlWithoutHash = url.replace( '#/', '' ),
        supportEmail   = "support@godunk.com",
        emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

    return emailBody;
  }
};*/



AccountsTemplates.configureRoute('signIn', {
  name: 'signIn',
  template: 'login',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('signUp', {
  name: 'signUp',
  template: 'login',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  template: 'login',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'changePwd',
  template: 'login',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  template: 'login',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('verifyEmail', {
  template: 'login',
  name: 'verifyEmail',
  layoutTemplate: 'blankLayout'
});