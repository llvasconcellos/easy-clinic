#Language: Greek
#Translators: mutil

el =

  add: "προσθέστε"
  and: "και"
  back: "πίσω"
  changePassword: "Αλλαγή Κωδικού"
  choosePassword: "Επιλογή Κωδικού"
  clickAgree: "Πατώντας Εγγραφή, συμφωνείτε σε"
  configure: "Διαμόρφωση"
  createAccount: "Δημιουργία Λογαριασμού"
  currentPassword: "Τρέχων Κωδικός"
  dontHaveAnAccount: "Δεν έχετε λογαριασμό;"
  email: "Email"
  emailAddress: "Ηλεκτρονική Διεύθυνση"
  emailResetLink: "Αποστολή Συνδέσμου Επαναφοράς"
  forgotPassword: "Ξεχάσατε τον κωδικό;"
  ifYouAlreadyHaveAnAccount: "Αν έχετε ήδη λογαριασμό"
  newPassword: "Νέος Κωδικός"
  newPasswordAgain: "Νέος Κωδικός (ξανά)"
  optional: "Προαιρετικά"
  OR: "Ή"
  password: "Κωδικός"
  passwordAgain: "Κωδικός (ξανά)"
  privacyPolicy: "Πολιτική Απορρήτου"
  remove: "αφαιρέστε"
  resetYourPassword: "Επαναφορά κωδικού"
  setPassword: "Ορίστε Κωδικό"
  sign: "Σύνδεση"
  signIn: "Είσοδος"
  signin: "συνδεθείτε"
  signOut: "Αποσύνδεση"
  signUp: "Εγγραφή"
  signupCode: "Κώδικας Εγγραφής"
  signUpWithYourEmailAddress: "Εγγραφή με την ηλεκτρονική σας διεύθυνση"
  terms: "Όροι Χρήσης"
  updateYourPassword: "Ανανεώστε τον κωδικό σας"
  username: "Όνομα χρήστη"
  usernameOrEmail: "Όνομα χρήστη ή email"
  with: "με"


  info:
    emailSent: "Το Email στάλθηκε"
    emailVerified: "Το Email επιβεβαιώθηκε"
    passwordChanged: "Ο Κωδικός άλλαξε"
    passwordReset: "Ο Κωδικός επαναφέρθηκε"


  error:
    emailRequired: "Το Email απαιτείται."
    minChar: "7 χαρακτήρες τουλάχιστον."
    pwdsDontMatch: "Οι κωδικοί δεν ταιριάζουν"
    pwOneDigit: "Ο κωδικός πρέπει να έχει τουλάχιστον ένα ψηφίο."
    pwOneLetter: "Ο κωδικός πρέπει να έχει τουλάχιστον ένα γράμμα."
    signInRequired: "Πρέπει να είστε συνδεδεμένος για να πραγματοποιήσετε αυτή την ενέργεια."
    signupCodeIncorrect: "Ο κώδικας εγγραφής δεν είναι σωστός."
    signupCodeRequired: "Ο κώδικας εγγραφής απαιτείται."
    usernameIsEmail: "Το όνομα χρήστη δεν μπορεί να είναι μια διεύθυνση email."
    usernameRequired: "Το όνομα χρήστη απαιτείται."


    accounts:

    #---- accounts-base
    #"@" + domain + " email required"
    #"A login handler should return a result or undefined"
      "Email already exists.": "Αυτό το email υπάρχει ήδη."
      "Email doesn't match the criteria.": "Το email δεν ταιριάζει με τα κριτήρια."
      "Invalid login token": "Άκυρο διακριτικό σύνδεσης"
      "Login forbidden": "Η είσοδος απαγορεύεται"
    #"Service " + options.service + " already configured"
      "Service unknown": "Άγνωστη υπηρεσία"
      "Unrecognized options for login request": "Μη αναγνωρίσιμες επιλογές για αίτημα εισόδου"
      "User validation failed": "Η επικύρωση του χρήστη απέτυχε"
      "Username already exists.": "Αυτό το όνομα χρήστη υπάρχει ήδη."
      "You are not logged in.": "Δεν είστε συνδεδεμένος."
      "You've been logged out by the server. Please log in again.": "Αποσυνδεθήκατε από τον διακομιστή. Παρακαλούμε συνδεθείτε ξανά."
      "Your session has expired. Please log in again.": "Η συνεδρία έληξε. Παρακαλούμε συνδεθείτε ξανά."


    #---- accounts-oauth
      "No matching login attempt found": "Δεν βρέθηκε καμία απόπειρα σύνδεσης που να ταιριάζει"


    #---- accounts-password-client
      "Password is old. Please reset your password.": "Ο κωδικός είναι παλιός. Παρακαλούμε επαναφέρετε τον κωδικό σας."


    #---- accounts-password
      "Incorrect password": "Εσφαλμένος κωδικός"
      "Invalid email": "Εσφαλμένο email"
      "Must be logged in": "Πρέπει να είστε συνδεδεμένος"
      "Need to set a username or email": "Χρειάζεται να ορίσετε όνομα χρήστη ή email"
      "old password format": "κωδικός παλιάς μορφής"
      "Password may not be empty": "Ο κωδικός δεν μπορεί να είναι άδειος"
      "Signups forbidden": "Οι εγγραφές απαγορεύονται"
      "Token expired": "Το διακριτικό σύνδεσης έληξε"
      "Token has invalid email address": "Το διακριτικό σύνδεσης έχει άκυρη διεύθυνση email"
      "User has no password set": "Ο χρήστης δεν έχει ορίσει κωδικό"
      "User not found": "Ο χρήστης δεν βρέθηκε"
      "Verify email link expired": "Ο σύνδεσμος επαλήθευσης του email έληξε"
      "Verify email link is for unknown address": "Ο σύνδεσμος επαλήθευσης του email είναι για άγνωστη διεύθυνση"

    #---- match
      "Match failed": "Η αντιστοίχηση απέτυχε"

    #---- Misc...
      "Unknown error": "Άγνωστο σφάλμα"


T9n.map "el", el