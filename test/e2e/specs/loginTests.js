module.exports = {
  'Login Successful Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .assert.title('Recruitment')
      .assert.visible('input[type=text][aria-label=Username]', 'Asserting if Username input field is visible')
      .assert.visible('input[type=password][aria-label=Password]', 'Asserting if Password input field is visible')
      .setValue('input[type=text][aria-label=Username]', 'dokud914410820')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .useXpath()
      .assert.elementPresent("//form/button", 'Asserting button is present')
      .click("//form/button")
      .pause(1000)
      .assert.elementPresent('//div[@class="snack__content"][string() = "Welcome!"]', 'Asserting Success message is present')
      .useCss()
      .end()
  },

  'Login Unsuccessful Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .assert.title('Recruitment')
      .assert.visible('input[type=text][aria-label=Username]', 'Asserting if Username input field is visible')
      .assert.visible('input[type=password][aria-label=Password]', 'Asserting if Password input field is visible')
      .setValue('input[type=text][aria-label=Username]', 'someuser')
      .setValue('input[type=password][aria-label=Password]', 'withapassword')
      .useXpath()
      .assert.elementPresent("//form/button", 'Asserting button is present')
      .click("//form/button")
      .pause(500)
      .assert.elementPresent('//div[@class="snack__content"][string() = "The username or password was incorrect"]', 'Asserting Error message is present')
      
      .useCss()
      .end()
  },

  'Login Unavailable Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 10000)
      .assert.title('Recruitment')
      .assert.visible('input[type=text][aria-label=Username]', 'Asserting if Username input field is visible')
      .useXpath()
      .assert.elementPresent("//form/button", 'Asserting button is present')
      .assert.attributeEquals("//form/button", 'disabled', 'true', 'Asserting attribute "disabled" of button equals true')
      .end()

  }

}