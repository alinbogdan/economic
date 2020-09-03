import { browser, protractor, element, by } from "protractor";
import { HomePage } from "../pages/way-2-automation/home.page";
import { MenuBarPage } from "../pages/way-2-automation/menu-bar.page";
import { DatepickerPage } from "../pages/way-2-automation/datepicker.page";
import * as moment from "moment";

browser.ignoreSynchronization = true;
browser.driver.manage().window().maximize();

describe(`way2automation E2E smoke test`, function () {
  let homePage = new HomePage();
  let menuBarPage = new MenuBarPage();
  let datepickerPage = new DatepickerPage();

  const way2AutomationUrl =
    "http://way2automation.com/way2auto_jquery/index.php";

  const datepickerUrl =
    "http://way2automation.com/way2auto_jquery/datepicker.php";

  const registrationName = "Marco Polo";
  const registrationPhone = "0123456789";
  const registrationEmail = "marco.polo2001@gmail.com";
  const registrationCountry = "Italy";
  const registrationCity = "Venice";
  const registrationUsername = "marcovsky2001";
  const registrationPassword = "marcovitz123!";

  let formatValueBeforeSelection;
  let formatValueAfterSelection;
  const until = protractor.ExpectedConditions;

  it(`should navigate to way2automation homepage`, async function () {
    await browser.get(way2AutomationUrl);

    expect(await browser.getCurrentUrl()).toBe(way2AutomationUrl);
  });

  it(`should fill in the registration form`, async function () {
    await browser.wait(
      until.visibilityOf(homePage.registrationForm),
      10000,
      "Registration form is taking too long to appear on page or DOM!"
    );

    expect(await homePage.registrationForm.isDisplayed()).toBe(true);

    await homePage.nameInput.sendKeys(registrationName);
    await homePage.phoneInput.sendKeys(registrationPhone);
    await homePage.emailInput.sendKeys(registrationEmail);
    await homePage.cityInput.sendKeys(registrationCity);
    await homePage.usernameInput.sendKeys(registrationUsername);
    await homePage.passwordInput.sendKeys(registrationPassword);

    await homePage.countrySelector.click();

    await homePage.countrySelector
      .$('[value="' + registrationCountry + '"]')
      .click();

    await homePage.countrySelector.click(); // needed to close to dropdown

    await homePage.registrationForm.submit();

    await browser.wait(
      until.invisibilityOf(homePage.registrationForm),
      10000,
      "Registration form is taking too long to disappear from page or DOM!"
    );

    await browser.wait(
      until.elementToBeClickable(menuBarPage.homeNavBarLink),
      5000,
      "Home link is taking too long to become clickable!"
    );

    expect(await homePage.registrationForm.isPresent()).toBe(false);
  });

  it(`should open the date picker from the widget menu`, async function () {
    await browser.actions().mouseMove(menuBarPage.widgetNavBarLink).perform();

    await menuBarPage.widgetNavBarLink_datePickerOption.click();

    expect(await browser.getCurrentUrl()).toBe(datepickerUrl);
    expect(await datepickerPage.datepickerHeading.getText()).toBe("Datepicker");
  });

  it(`should navigate to the "FORMAT DATE" section`, async function () {
    await datepickerPage.internalNavBar_formatDate.click();

    expect(
      await browser.driver
        .findElement(by.css(`[src="datepicker/defult4.html"]`))
        .then(function displayed(elem) {
          return elem.isDisplayed();
        })
    ).toBe(true);
  });

  it(`should select today's date`, async function () {
    // switch to iframe before interacting with date/format picker
    await browser
      .switchTo()
      .frame(
        await browser.driver.findElement(
          by.css(`[src="datepicker/defult4.html"]`)
        )
      );

    expect(await datepickerPage.dateInput.getAttribute("value")).toBe("");

    await datepickerPage.dateInput.click();

    await datepickerPage.currentDate.click();

    expect(await datepickerPage.dateInput.getAttribute("value")).not.toBe("");
  });

  it(`should select the "ISO 8601" Format option`, async function () {
    formatValueBeforeSelection = datepickerPage.dateFormatSelector.getAttribute(
      "value"
    );

    await datepickerPage.dateFormatSelector.click();

    const dateFormatOption = "yy-mm-dd";

    await datepickerPage.dateFormatSelector
      .$('[value="' + dateFormatOption + '"]')
      .click();

    formatValueAfterSelection = datepickerPage.dateFormatSelector.getAttribute(
      "value"
    );

    await datepickerPage.dateFormatSelector.click(); // needed to close the dropdown

    expect(await formatValueAfterSelection).not.toBe(
      await formatValueBeforeSelection
    );
  });

  it(`should validate the shown date against the current date`, async function () {
    const currentDate = moment().format("YYYY-MM-DD");

    const displayedDate = datepickerPage.dateInput.getAttribute("value");

    expect(await displayedDate).toBe(currentDate);
  });
});
