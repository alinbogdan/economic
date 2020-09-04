import { by, element } from "protractor";

export class Helper {
  //Gets a random number between min and max
  getRandomNumber = function (min, max) {
    return parseInt(Math.random() * (max - min) + min);
  };
}
