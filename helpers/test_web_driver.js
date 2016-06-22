module.exports = {};

// WEB DRIVER INSTANCE AND BUILT-IN UTILITY METHODS

var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

var driver = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

module.exports.driver = driver;
module.exports.By = By;

//
// HELPER FUNCTIONS
//

module.exports.getIndex = function(){
  return driver.get('http://localhost:3000/');
};

module.exports.clickNew = function(){
  return driver.findElement(By.partialLinkText('new')).click();
};

module.exports.clickEdit = function(){
  return driver.findElement(By.className("btn-edit-robot")).click();
};

module.exports.fillInRobotName = function(){
  return driver.findElement(By.name('robotName')).sendKeys("Baker Bot");
};

module.exports.fillInRobotDescription = function(){
  return driver.findElement(By.name('robotDescription')).sendKeys("Makes the cakes.");
};

module.exports.clearFormValues = function(){
  ["robotName","robotDescription"].forEach(function(attrName){
    driver.findElement(By.name(attrName)).then(function(element){
      return element.clear()
    })
  })
};
// @params [Object] revisedValues keys must match form input names
// @example reviseFormValues({robotName: "CobblerBot 123"})
// @example reviseFormValues({robotName: "CobblerBot 123", robotDescription: "Makes the shoes."})
module.exports.reviseFormValues = function(revisedValues){
  Object.keys(revisedValues).forEach(function(attrName){
    driver.findElement(By.name(attrName)).then(function(element){

      //if (revisedValues[attrName]) {
      //  console.log("SENDING KEYS")
      //  element.clear().then(function(){
      //    return element.sendKeys(revisedValues[attrName])
      //  })
      //} else {
      //  console.log("NOT SENDING KEYS")
      //  return element.clear()
      //}

      element.clear().then(function(){
        return element.sendKeys(revisedValues[attrName])
      })
    })
  })
};

module.exports.clickSubmit = function(){
  return driver.findElement(By.xpath('//button[@type="submit"]')).click();
};

module.exports.findSiteTitle = function(){
  return driver.getTitle();
}

module.exports.findPageTitle = function(){
  return driver.findElement(By.tagName("h2")).then(function(element){
    return element.getText();
  })
};

module.exports.findRobotName = function(){
  return driver.findElement(By.name('robotName')).getAttribute("value");
};

module.exports.findMessages = function(messageType){
  return driver.findElements(By.css("div .alert-"+messageType));
};

module.exports.logMessages = function(elements){
  elements.forEach(function(element){
    element.getText().then(function(text){
      console.log("MESSAGE", text)
    })
  })
};

//
// EXPECTATIONS / ASSERTIONS
//

var expect = require('expect');

module.exports.expectURL = function(expectedURL){
  return driver.getCurrentUrl().then(function(url){
    console.log("CURRENT URL", url);
    expect(url).toEqual(expectedURL)
  })
}
