import { TAPi18n } from 'meteor/tap:i18n';

AccountsTemplates.configure({
  confirmPassword: false,
  sendVerificationEmail: true,
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

//When set to true together with sendVerificationEmail, forbids user login unless the email address is verified. Warning: experimental! Use it only if you have accounts-password as the only service!!!
//enforceEmailVerification: true

//Specifies whether to forbid user registration from the client side. In case it is set to true, neither the link for user registration nor the sign up form will be shown
//forbidClientAccountCreation: true

//Specifies whether to display a link to the resend verification email page/form 
//showResendVerificationEmailLink: true,

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