module.exports = {
  'List Application By Name' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'recruiter')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .click('button[id=loginButton')
      .waitForElementVisible('a[id=searchApplicationButton]', 1000)
      .click('a[id=searchApplicationButton')
      .waitForElementVisible('div[class=headline]', 3000)
      .assert.elementPresent('input[id=nameInputField]')
      .setValue('input[id=nameInputField]', 'Test Testsson')
      .pause(5000)
      .assert.containsText('div[class=headline]', 'Test Testsson')
      .end()

  },

  'List Application By Date of Registration Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'recruiter')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .click('button[id=loginButton')
      .waitForElementVisible('a[id=searchApplicationButton]', 1000)
      .click('a[id=searchApplicationButton')
      .pause(1000)
      .useXpath()
      .click('//*[@id="dateOfRegPicker"]/div/div/div[1]/input')
      .assert.elementPresent('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .click('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .useCss()
      .click('button[id=datePickerOKButton]')
      .pause(5000)
      .end()
  },

  'List Application By Competence Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'recruiter')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .click('button[id=loginButton')
      .waitForElementVisible('a[id=searchApplicationButton]', 1000)
      .click('a[id=searchApplicationButton')
      .pause(1000)
      .setValue('input[id=pickCompetence]', ['Test', client.Keys.ENTER])
      .pause(1000)
      .assert.containsText('div[class=headline]', 'Test Testsson')
      .end()
  },

  'List Application By Availability Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'recruiter')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .click('button[id=loginButton')
      .waitForElementVisible('a[id=searchApplicationButton]', 1000)
      .click('a[id=searchApplicationButton')
      .pause(1000)

      .useXpath()
      .click('//*[@id="fromPicker"]/div/div/div[1]/input')
      .assert.elementPresent('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .click('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .useCss()
      .click('button[id=datePickerOKButton]')
      .pause(1000)

      .useXpath()
      .click('//*[@id="toPicker"]/div/div/div[1]/input')
      .assert.elementPresent('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .click('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .useCss()
      .click('button[id=datePickerOKButton]')

      .pause(1000)
      .assert.containsText('div[class=headline]', 'Test Testsson')
      .end()
  }
}