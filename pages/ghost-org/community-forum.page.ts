import { by, element } from "protractor";

export class CommunityForumPage {
  ghostForumLogo = element(by.id("site-logo"));

  searchButton = element(by.id("search-button"));

  searchTermInput = element(by.id("search-term"));

  searchResults = element(by.css("div.results .main-results"));

  searchResultsList = element.all(by.css("div.results .main-results ul li"));

  searchTopic15271_title = element(
    by.linkText("External Links in Ghost Blog Return 404 page")
  );
}
