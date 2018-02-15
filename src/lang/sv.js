export default {
  login: {
    title: 'Logga in',
    register: 'Registrera',
    required: {
      username: 'Du måste ange ett användarnamn',
      password: 'Du måste ange ett lösenord'
    },
    invalid: 'Fel användarnamn eller lösenord'
  },
  migration: {
    mustUpdate: 'Ditt konto saknar kritisk information.',
    title: 'Kontomigration',
    migrate: 'Migrera'
  },
  register: {
    title: 'Kontoregistrering',
    register: 'Registrera',
    password_confirm_mismatch: 'Lösenorden stämmet inte överrens.',
    password_confirm: 'Lösenordsbekräftelse',
    required: {
      username: 'Du måste ange ett användarnamn',
      password: 'Du måste ange ett lösenord',
      password_confirm: 'Du måste ange lösenordet igen',
      firstname: 'Du måste ange ett förnamn',
      lastname: 'Du måste ange ett efternamn',
      email: 'Du måste ange en e-postadress',
      ssn: 'Du måste ange ett personnummer'
    },
    unique: {
      username: 'Användarnamnet är inte tillgängligt',
      ssn: 'Personnumret är inte tillgängligt',
      email: 'E-postadressen är inte tillgänglig'
    },
    email: {
      email: 'Felaktig e-postadress'
    },
    success: 'Ditt konto har skapats!'
  },
  user: {
    email: 'E-post',
    ssn: 'Personnummer',
    firstname: 'Förnamn',
    lastname: 'Efternamn',
    dateOfBirth: 'Födelsedatum',
    username: 'Användarnamn',
    password: 'Lösenord',
    competence: 'Kompetens',
    competences: 'Kompetenser'
  },
  navbar: {
    brandName: 'Rekryteringsapplikation',
    registerApplication: 'Jobbansökan',
    profile: 'Profil',
    applications: 'Rekrytering',
    logout: 'Logga ut'
  }
}
