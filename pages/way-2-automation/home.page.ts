import { by, element, $ } from "protractor";

export class HomePage {
  registrationForm = $("#load_box #load_form");

  nameInput = this.registrationForm.element(by.name("name"));

  phoneInput = this.registrationForm.element(by.name("phone"));

  emailInput = this.registrationForm.element(by.name("email"));

  cityInput = this.registrationForm.element(by.name("city"));

  usernameInput = this.registrationForm.element(by.name("username"));

  passwordInput = this.registrationForm.element(by.name("password"));

  countrySelector = this.registrationForm.element(by.name("country"));
}
