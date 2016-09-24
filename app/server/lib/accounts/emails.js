Accounts.emailTemplates.siteName = "Clínica Fácil";
Accounts.emailTemplates.from     = "Clínica Fácil <clinicafacil@devhouse.com.br>";


// Accounts.emailTemplates.verifyEmail = {
//   subject() {
//     return "[Clínica Fácil] Verify Your Email Address";
//   },
//   text( user, url ) {
//     let emailAddress   = user.emails[0].address,
//         urlWithoutHash = url.replace( '#/', '' ),
//         supportEmail   = "support@godunk.com",
//         emailBody      = `To verify your email address (${emailAddress}) visit the following link:\n\n${urlWithoutHash}\n\n If you did not request this verification, please ignore this email. If you feel something is wrong, please contact our support team: ${supportEmail}.`;

//     return emailBody;
//   }
// };



// Accounts.emailTemplates.siteName = "AwesomeSite";
// Accounts.emailTemplates.from = "AwesomeSite Admin <clinicafacil@devhouse.com.br>";
// Accounts.emailTemplates.enrollAccount.subject = function (user) {
//     return "Welcome to Awesome Town, " + user.profile.name;
// };
// Accounts.emailTemplates.enrollAccount.text = function (user, url) {
//    return "You have been selected to participate in building a better future!"
//      + " To activate your account, simply click the link below:\n\n"
//      + url;
// };
// Accounts.emailTemplates.resetPassword.from = function () {
//    // Overrides value set in Accounts.emailTemplates.from when resetting passwords
//    return "AwesomeSite Password Reset <no-reply@devhouse.com.br>";
// };