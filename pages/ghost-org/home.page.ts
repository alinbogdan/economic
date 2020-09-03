import { by, element, $ } from "protractor";

export class HomePage {
  ghostLogo = $("a.gh-nav-logo.gh-navbar-item");

  resourcesDropdown = element(
    by.cssContainingText(".gh-drop-trigger.gh-navbar-item", "Resources")
  );

  resourcesDropdown_communityForumOption = element(
    by.partialLinkText("Community Forum")
  );
}
