module.exports = {
  'View Application Test' : function (client) {
    client
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'recruiter')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .click('button[id=loginButton')
      .waitForElementVisible('a[id=searchApplicationButton]', 1000)
      .click('a[id=searchApplicationButton')
      .waitForElementVisible('div[class=headline]', 3000)
      .useXpath()
      .click('//a[contains(@href,"/application/view/1")]')
      .pause(5000)
      .assert.elementPresent('//*[@id="inspire"]/div[1]/div/ul/li[1]/a')
      .useCss()
      .waitForElementVisible('div[id=applicant]', 3000)
      .assert.elementPresent('button[id=createPDF]')
      .end()
  }
}