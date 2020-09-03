import { by, element } from "protractor";

export class MenuBarPage {
  navBar = element(by.id("main-nav"));

  homeNavBarLink = this.navBar.element(by.linkText("Home"));

  widgetNavBarLink = this.navBar.element(by.linkText("Widget"));

  widgetNavBarLink_datePickerOption = this.navBar.element(
    by.linkText("Datepicker")
  );
}
