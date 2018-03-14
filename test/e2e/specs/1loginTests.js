module.exports = {
  'Login Successful Test' : function (client) {
    client
      .resizeWindow(1200, 980)
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .assert.title('Recruitment')
      .assert.visible('input[type=text][aria-label=Username]', 'Asserting if Username input field is visible')
      .assert.visible('input[type=password][aria-label=Password]', 'Asserting if Password input field is visible')
      .setValue('input[type=text][aria-label=Username]', 'username')
      .setValue('input[type=password][aria-label=Password]', 'password')
      .useXpath()
      .waitForElementVisible("//form/button", 1000)
      .click("//form/button")
      .waitForElementVisible('//div[@class="snack__content"][string() = "Welcome!"]', 1000)
      .assert.elementPresent('//div[@class="snack__content"][string() = "Welcome!"]', 'Asserting Success message is present')
      .useCss()
      .end()
  },

  'Login Unsuccessful Test' : function (client) {
    client
      .resizeWindow(1200, 980)
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .assert.title('Recruitment')
      .waitForElementVisible('input[type=text][aria-label=Username]', 1000)
      .waitForElementVisible('input[type=password][aria-label=Password]', 1000)
      .setValue('input[type=text][aria-label=Username]', 'somenonexistinguser')
      .setValue('input[type=password][aria-label=Password]', 'withapassword')
      .useXpath()
      .waitForElementVisible("//form/button", 1000)
      .click("//form/button")
      .waitForElementVisible('//div[@class="snack__content"][string() = "The username or password was incorrect"]', 1000)
      .assert.elementPresent('//div[@class="snack__content"][string() = "The username or password was incorrect"]', 'Asserting Error message is present')
      .useCss()
      .end()
  },

  'Login Unavailable Test' : function (client) {
    client
      .resizeWindow(1200, 980)
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 10000)
      .assert.title('Recruitment')
      .assert.visible('input[type=text][aria-label=Username]', 'Asserting if Username input field is visible')
      .useXpath()
      .waitForElementVisible("//form/button", 1000)
      .assert.elementPresent("//form/button", 'Asserting button is present')
      .assert.attributeEquals("//form/button", 'disabled', 'true', 'Asserting attribute "disabled" of button equals true')
      .end()
  }

}