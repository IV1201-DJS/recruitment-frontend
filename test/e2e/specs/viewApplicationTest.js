module.exports = {
  'View Application Test' : function (client) {
    client
      .resizeWindow(1200, 980)
      .url('http://0.0.0.0:8080/login')
      .waitForElementVisible('body', 1000)
      .setValue('input[type=text][aria-label=Username]', 'recruiter')
      .setValue('input[type=password][aria-label=Password]', 'hej123')
      .click('button[id=loginButton')
      .waitForElementVisible('a[id=searchApplicationButton]', 1000)
      .click('a[id=searchApplicationButton')
      .waitForElementVisible('div[class=headline]', 1000)
      .useXpath()
      .waitForElementVisible('//a[contains(@href,"/application/view/1")]', 1000)
      .click('//a[contains(@href,"/application/view/1")]')
      .useCss()
      .waitForElementVisible('div[id=applicant]', 1000)
      .assert.elementPresent('button[id=createPDF]')
      .end()
  }
}