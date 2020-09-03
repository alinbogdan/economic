import { browser, protractor } from "protractor";
import { HomePage } from "../pages/ghost-org/home.page";
import { CommunityForumPage } from "../pages/ghost-org/community-forum.page";

browser.ignoreSynchronization = true;
browser.driver.manage().window().maximize();

describe(`ghost-org E2E smoke test`, function () {
  let homePage = new HomePage();
  let communityForumPage = new CommunityForumPage();

  const ghostOrgUrl = "https://ghost.org/";
  const until = protractor.ExpectedConditions;

  it(`should navigate to ghost.org homepage`, async function () {
    await browser.get(ghostOrgUrl);

    expect(await browser.getCurrentUrl()).toBe(ghostOrgUrl);
    expect(await homePage.ghostLogo.isDisplayed()).toBe(true);
  });

  it(`should navigate to the "Community Forum" section using the "Resources" menu`, async function () {
    await homePage.resourcesDropdown.click();

    await browser.wait(
      until.elementToBeClickable(
        homePage.resourcesDropdown_communityForumOption
      ),
      15000,
      "Resources - dropdown options are taking too long to appear on page or DOM!"
    );

    await homePage.resourcesDropdown_communityForumOption.click();

    expect(await browser.getCurrentUrl()).toContain("https://forum.ghost.org/");
    expect(await communityForumPage.ghostForumLogo.isDisplayed()).toBe(true);
  });

  it(`should search for “create new blog”`, async function () {
    await communityForumPage.searchButton.click();

    await browser.wait(
      until.visibilityOf(communityForumPage.searchTermInput),
      10000,
      "Search-term input is taking too long to appear on page or DOM!"
    );

    await communityForumPage.searchTermInput.sendKeys("create new blog");

    await browser.wait(
      until.visibilityOf(communityForumPage.searchResults),
      10000,
      "Search results are taking too long to appear on page or DOM!"
    );

    expect(await communityForumPage.searchResults.isDisplayed()).toBe(true);
  });

  it(`should open the 3rd link from the "create new blog" search results`, async function () {
    await communityForumPage.searchResultsList.get(2).click();

    await browser.wait(
      until.visibilityOf(communityForumPage.searchTopic15271_title),
      10000,
      "Search results are taking too long to appear on page or DOM!"
    );

    expect(await browser.getCurrentUrl()).toBe(
      "https://forum.ghost.org/t/external-links-in-ghost-blog-return-404-page/15271"
    );
  });
});
