import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  getFirstNameFormElement(): ElementFinder {
    return element(by.css('#firstName'));
  }
  getLastNameFormElement(): ElementFinder {
    return element(by.id('lastName'));
  }

  getEmailFormElement(): ElementFinder {
    return element(by.id('email'));
  }

  getPasswordFormElement(): ElementFinder {
    return element(by.id('password'));
  }

  getConfirmedPasswordFormElement(): ElementFinder {
    return element(by.id('confirmedPassword'));
  }
  getForm(): ElementFinder {
    return element(by.id('signupForm'));
  }
  async fillInput(el: any, text: string) {
    await el.click();
    await el.clear();
    await el.sendKeys(text);
  }
}
