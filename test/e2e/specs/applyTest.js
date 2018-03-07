module.exports = {
  'List Application Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'applicant')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .pause(1000)
      .click('button[id=loginButton')
      .waitForElementVisible('a[id=registerApplicationButton]', 1000)
      .click('a[id=registerApplicationButton')
      .click('input[id=compPicker]')
      .clickElementWithText('a', 'Robertson')
      .click('button[id=continueFromCompetencesButton')
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
      .click('button[id=continueFromAvailButton')
      .pause(3000)
      .click('button[id=sendApplicationButton]')
      .pause(3000)
      .end()
  }
}

      