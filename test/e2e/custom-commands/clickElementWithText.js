/**
 * Finds an array of elements based on a common selector, then finds a specific element within the array by its text, and clicks on it
 *
 * Example: browser.clickElementWithText('button', 'Confirm');
 *
 * @param selector - Selector of elements (ie. '[data-qa=MultipleElements]')
 * @param text - Unique text of the specific element you want to click on
 */

exports.command = function (selector, text) {
  let element = null;
  this.waitForElementVisible(selector, 5000);
  this.elements('css selector', selector, function (elements) {
    let success = false;
    for (let i = 0; (i < elements.value.length) && (success === false); i++) {
      this.elementIdText(elements.value[i].ELEMENT, function (result) {
        if (result.value === text) {
          console.log(' ♦ Clicking ' + selector + ' with text: ' + result.value);
          success = true;
          element = elements.value[i].ELEMENT;
        }
      });
    }
  });
  this.perform(function () {
    if (element === null) {
      throw new TypeError('Element was not found with text: ' + text);
    }
    else {
      this.api.elementIdClick(element);
    }
  })
};