export default {
  home: {
    title: 'Welcome the recruitment application',
    subheading: 'This is the best application ever!',
    body: 'Register your application today!'
  },
  login: {
    success: 'Welcome!',
    title: 'Login',
    register: 'Register',
    required: {
      username: 'The username is required',
      password: 'The password is required'
    },
    invalid: 'The username or password was incorrect'
  },
  forgotten: {
    title: 'Older user and forgotten password?',
    send: 'Send'
  },
  migration: {
    mustUpdate: 'Your account is missing critical information.',
    title: 'Account migration',
    migrate: 'Migrate',
    oldUserText: 'Old user?',
    success: 'Your account has been migrated',
    alreadyMigrated: 'Your account has already been migrated'
  },
  register: {
    back: 'Back',
    title: 'Account registration',
    register: 'Register',
    password_confirm_mismatch: 'The passwords does not match.',
    password_confirm: 'Password confirmation',
    required: {
      username: 'The username is required',
      password: 'The password is required',
      password_confirm: 'The password again is required',
      name: 'The first name is required',
      firstname: 'The first name is required',
      surname: 'The last name is required',
      lastname: 'The last name is required',
      email: 'The email is required',
      ssn: 'The ssn is required'
    },
    unique: {
      username: 'The provided username is not available',
      ssn: 'The provided SSN is not unique',
      email: 'The provided email is not unique'
    },
    email: {
      email: 'Invalid email address'
    },
    success: 'Your account has been created!'
  },
  user: {
    email: 'Email',
    ssn: 'SSN',
    firstname: 'First name',
    lastname: 'Last name',
    dateOfBirth: 'Date of birth',
    username: 'Username',
    password: 'Password',
    competence: 'Competence',
    competences: 'Competences',
    name: 'Name'
  },
  navbar: {
    home: 'Home',
    brandName: 'Recruitment application',
    registerApplication: 'Register application',
    applications: 'Applications',
    logout: 'Logout',
    settings: 'Settings'
  },
  settings: {
    title: 'Settings',
    general: 'General',
    locale: {
      title: 'Language',
      subtitle: 'Choose which language the application shall be shown in'
    }
  },
  competence: {
    competences: 'Competences',
    competence: 'Competence',
    experience: 'Experience',
    years: 'years',
    verifyApplication: 'Verify application',
    back: 'Back',
    continue: 'Continue',
    send: 'Send'
  },
  availability: {
    title: 'Availability',
    fromDate: 'From date',
    toDate: 'To date',
    ok: 'Ok',
    cancel: 'Cancel'
  },
  validate: {
    success: 'Your application has been registered!'
  },
  userApplication: {
    dateOfRegistration: 'Date of registration',
    viewProfile: 'View application',
    applicant: 'Applicant',
    status: 'Status',
    changeStatus: 'Change status',
    generatePDF: 'Generate PDF'
  },
  status: {
    ACCEPTED: 'Accepted',
    DECLINED: 'Declined'
  },
  error: {
    PENDING_APPLICATION_EXISTS: 'You already have a pending application',
    APPLICATION_STATUS_ALREADY_SET: 'Someone has already updated the status for this application',
    COMPETENCE_PARAMETERS_INVALID: 'You need at least one competence',
    AVAILABILITY_PARAMETERS_INVALID: 'You need at least one availability',
    EMAIL_NOT_FOUND: 'A user with the provided email does not exist',
    CREDENTIALS_INCORRECT: 'The username or password was incorrect'
  },
  restore: {
    success: 'An email has been sent to: '
  }
}
