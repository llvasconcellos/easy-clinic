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

//Specifies whether to forbid user registration from the client side. In case it is set to true, neither the link for user registration nor the sign up form will be shown
//forbidClientAccountCreation: true

//Specifies whether to display a link to the resend verification email page/form 
  showResendVerificationEmailLink: true,

  // Redirects
  homeRoutePath: '/',
  redirectTimeout: 4000,

  // Hooks
  // onLogoutHook: myLogoutFunc,
  // onSubmitHook: mySubmitFunc,
  // preSignUpHook: myPreSubmitFunc,
  // postSignUpHook: myPostSubmitFunc,
});

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
  //trim: true
},{
  _id: 'lastName',
  type: 'text',
  displayName: "lastName",
  placeholder: {
    signUp: "lastName"
  },
  required: true,
  minLength: 1,
  //trim: true
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
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('signUp', {
  name: 'signUp',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('forgotPwd', {
  name: 'forgotPwd',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('changePwd', {
  name: 'changePwd',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('resetPwd', {
  name: 'resetPwd',
  layoutTemplate: 'blankLayout'
});
AccountsTemplates.configureRoute('verifyEmail', {
  name: 'verifyEmail',
  layoutTemplate: 'blankLayout'
});