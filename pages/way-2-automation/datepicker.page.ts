import { by, element } from "protractor";

export class DatepickerPage {
  datepickerHeading = element.all(by.css("section div h1")).first();

  internalNavBar = element(by.className("internal_navi"));

  internalNavBar_formatDate = this.internalNavBar.element(
    by.linkText("FORMAT DATE")
  );

  dateFormatSelector = element(by.id("format"));

  dateInput = element(by.id("datepicker"));

  calendarDatepicker = element(by.id("ui-datepicker-div"));

  currentDate = this.calendarDatepicker.element(
    by.className("ui-datepicker-today")
  );
}
