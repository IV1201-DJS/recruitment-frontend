export default {
  home: {
    title: 'Välkommen till rekryteringsapplikationen',
    subheading: 'Det här är den bästa applikationen någonsin!',
    body: 'Skriv in dig idag!'
  },
  login: {
    success: 'Välkommen!',
    title: 'Logga in',
    register: 'Registrera',
    required: {
      username: 'Du måste ange ett användarnamn',
      password: 'Du måste ange ett lösenord'
    },
    invalid: 'Fel användarnamn eller lösenord'
  },
  forgotten: {
    title: 'Gammal användare och glömt lösenord?',
    send: 'Skicka'
  },
  migration: {
    mustUpdate: 'Ditt konto saknar kritisk information.',
    title: 'Kontomigration',
    migrate: 'Migrera',
    oldUserText: 'Gammal användare?',
    success: 'Ditt konto har migrerat',
    alreadyMigrated: 'Ditt konto har redan migrerats'
  },
  register: {
    back: 'Tillbaka',
    title: 'Kontoregistrering',
    register: 'Registrera',
    password_confirm_mismatch: 'Lösenorden stämmet inte överrens.',
    password_confirm: 'Lösenordsbekräftelse',
    required: {
      username: 'Du måste ange ett användarnamn',
      password: 'Du måste ange ett lösenord',
      password_confirm: 'Du måste ange lösenordet igen',
      name: 'Du måste ange ett förnamn',
      firstname: 'Du måste ange ett förnamn',
      surname: 'Du måste ange ett efternamn',
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
    competences: 'Kompetenser',
    name: 'Namn'
  },
  navbar: {
    home: 'Hem',
    brandName: 'Rekryteringsapplikation',
    registerApplication: 'Jobbansökan',
    applications: 'Rekrytering',
    logout: 'Logga ut',
    settings: 'Inställningar'
  },
  settings: {
    title: 'Inställningar',
    general: 'Allmänt',
    locale: {
      title: 'Språk',
      subtitle: 'Välj vilket språk applikationen ska visas i'
    }
  },
  competence: {
    competences: 'Kompetenser',
    competence: 'Kompetens',
    experience: 'Erfarenhet',
    years: 'år',
    verifyApplication: 'Bekräfta ansökan',
    back: 'Tillbaka',
    continue: 'Fortsätt',
    send: 'Skicka'
  },
  availability: {
    title: 'Tillgänglighet',
    fromDate: 'Från datum',
    toDate: 'Till datum',
    ok: 'Ok',
    cancel: 'Avbryt'
  },
  validate: {
    success: 'Din ansökan har registrerats!',
    error: {
      pending: 'Du har redan en pågående ansökan'
    }
  },
  userApplication: {
    dateOfRegistration: 'Ansökningsdatum',
    viewProfile: 'Visa ansökan',
    applicant: 'Applikant',
    status: 'Status',
    changeStatus: 'Ändra status',
    generatePDF: 'Generera PDF'
  },
  status: {
    ACCEPTED: 'Accepterad',
    DECLINED: 'Nekad'
  },
  error: {
    PENDING_APPLICATION_EXISTS: 'Du har redan en pågående ansökan',
    APPLICATION_STATUS_ALREADY_SET: 'Någon har redan uppdaterat den här applikationen',
    COMPETENCE_PARAMETERS_INVALID: 'Du har inte angett någon kompetens',
    AVAILABILITY_PARAMETERS_INVALID: 'Du har inte angett någon tillgänglighet',
    EMAIL_NOT_FOUND: 'Det finns inget konto med en angivna mailadressen',
    CREDENTIALS_INCORRECT: 'Fel användarnamn eller lösenord'
  },
  restore: {
    success: 'Ett mail har skickats till: '
  }
}
