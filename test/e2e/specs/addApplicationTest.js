module.exports = {
  'Add Application Test' : function (client) {
    client
      .resizeWindow(1200, 980)
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'username')
      .setValue('input[type=password][aria-label=Password]', 'password')
      .pause(1000)
      .click('button[id=loginButton]')
      .waitForElementVisible('a[id=registerApplicationButton]', 1000)
      .click('a[id=registerApplicationButton')
      .waitForElementVisible('input[id=compPicker]', 1000, 'Waiting for the Input field of competences to be visible')
      .click('input[id=compPicker]')
      .setValue('input[id=compPicker]', ['Test', client.Keys.ENTER])
      .click('button[id=continueFromCompetencesButton]')
      .useXpath()
      .waitForElementVisible('//*[@id="fromPicker"]/div/div/div[1]/input', 1000)
      .click('//*[@id="fromPicker"]/div/div/div[1]/input')
      .waitForElementVisible('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]', 1000)
      .click('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .useCss()
      .click('button[id=datePickerOKButton]')
      .useXpath()
      .waitForElementVisible('//*[@id="toPicker"]/div/div/div[1]/input', 1000)
      .click('//*[@id="toPicker"]/div/div/div[1]/input')
      .waitForElementVisible('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]', 1000)
      .click('//button[@class="btn btn--flat btn--floating btn--outline accent--text"]')
      .useCss()
      .waitForElementVisible('button[id=datePickerOKButton]', 1000)
      .click('button[id=datePickerOKButton]')
      .waitForElementVisible('button[id=continueFromAvailButton', 1000)
      .click('button[id=continueFromAvailButton')
      .waitForElementVisible('button[id=sendApplicationButton]', 1000)
      .click('button[id=sendApplicationButton]')
      .end()
  }
}

      