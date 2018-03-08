module.exports = {
  'Register Successful Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/register')
      .useXpath()
      .assert.elementPresent("//div[@class='toolbar__title'][string() = 'Account registration']", 'Asserting Title "Account registration" present')
      .useCss()
      .assert.visible('input[type=text][aria-label="First name"]', 'Asserting if First name input field is visible')
      .assert.visible('input[type=text][aria-label="Last name"]', 'Asserting if Last name input field is visible')
      .assert.visible('input[type=text][aria-label="SSN"]', 'Asserting if SSN input field is visible')
      .assert.visible('input[type=text][aria-label="Email"]', 'Asserting if Email input field is visible')
      .assert.visible('input[type=text][aria-label="Username"]', 'Asserting if Username input field is visible')
      .assert.visible('input[type=password][aria-label="Password"]', 'Asserting if Password input field is visible')
      .assert.visible('input[type=password][aria-label="Password confirmation"]', 'Asserting if Password confirmation input field is visible')
      .setValue('input[type=text][aria-label="First name"]', 'Firstname')
      .setValue('input[type=text][aria-label="Last name"]', 'Lastname')
      .setValue('input[type=text][aria-label="SSN"]', '880204-0215')
      .setValue('input[type=text][aria-label="Email"]', 'mail@damails.se')
      .setValue('input[type=text][aria-label="Username"]', 'username')
      .setValue('input[type=password][aria-label="Password"]', 'password')
      .setValue('input[type=password][aria-label="Password confirmation"]', 'password')
      .useXpath()
      .click("//form/button")
      .pause(1000)
      .assert.elementPresent('//div[@class="snack__content"][string()="Your account has been created!"]', 'Asserting Success message is present')
      .useCss()
      .setValue('input[type=text][aria-label=Username]', 'username')
      .setValue('input[type=password][aria-label=Password]', 'password')
      .useXpath()
      .click("//form/button")
      .assert.elementPresent('//div[@class="snack__content"][string() = "Welcome!"]', 'Asserting Success message is present')
      .end()
  },

  'Register Unavailable Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/register')
      .useXpath()
      .assert.elementPresent("//div[@class='toolbar__title'][string() = 'Account registration']", 'Asserting Title "Account registration" present')
      .useCss()
      .assert.visible('input[type=text][aria-label="First name"]', 'Asserting if First name input field is visible')
      .assert.visible('input[type=text][aria-label="Last name"]', 'Asserting if Last name input field is visible')
      .assert.visible('input[type=text][aria-label="SSN"]', 'Asserting if SSN input field is visible')
      .assert.visible('input[type=text][aria-label="Email"]', 'Asserting if Email input field is visible')
      .assert.visible('input[type=text][aria-label="Username"]', 'Asserting if Username input field is visible')
      .assert.visible('input[type=password][aria-label="Password"]', 'Asserting if Password input field is visible')
      .assert.visible('input[type=password][aria-label="Password confirmation"]', 'Asserting if Password confirmation input field is visible')
      .setValue('input[type=text][aria-label="First name"]', 'Firstname')
      .setValue('input[type=text][aria-label="Last name"]', 'Lastname')
      .setValue('input[type=text][aria-label="SSN"]', '880204-0215')
      .setValue('input[type=text][aria-label="Email"]', 'mail@damails.se')
      .setValue('input[type=text][aria-label="Username"]', 'username')
      .setValue('input[type=password][aria-label="Password"]', 'password')
      .useXpath()
      .assert.attributeEquals("//form/button", 'disabled', 'true', 'Asserting attribute "disabled" of button equals true')
      .end()

  }
}