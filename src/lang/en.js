export default {
  login: {
    title: 'Login',
    register: 'Register',
    required: {
      username: 'The username is required',
      password: 'The password is required'
    },
    invalid: 'The username or password was incorrect'
  },
  migration: {
    mustUpdate: 'Your account is missing critical information.',
    title: 'Account migration',
    migrate: 'Migrate'
  },
  register: {
    title: 'Account registration',
    register: 'Register',
    password_confirm_mismatch: 'The passwords does not match.',
    password_confirm: 'Password confirmation',
    required: {
      username: 'The username is required',
      password: 'The password is required',
      password_confirm: 'The password again is required',
      firstname: 'The first name is required',
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
    competences: 'Competences'
  },
  navbar: {
    home: 'Home',
    brandName: 'Recruitment application',
    registerApplication: 'Register application',
    profile: 'Profile',
    applications: 'Applications',
    logout: 'Logout'
  }
}
