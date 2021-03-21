import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';
import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();

  });

  it('should navigate to success page on valid credentials', async () => {

    await page.navigateTo();
    await browser.manage().window().maximize();

    await page.fillInput(page.getFirstNameFormElement(), 'Bharath');
    await page.fillInput(page.getLastNameFormElement(), 'Muppa');
    await page.fillInput(page.getEmailFormElement(), 'bharathmuppa@gmail.com');
    await page.fillInput(page.getPasswordFormElement(), 'M@dsc1entist');
    await page.fillInput(page.getConfirmedPasswordFormElement(), 'M@dsc1entist');

    await page.getForm().submit();


    expect(browser.getCurrentUrl()).toContain('authorization/success');
  });

  it('should not navigate to success page on invalid credentials (password has first name in it)', async () => {

    await page.navigateTo();
    await browser.manage().window().maximize();

    await page.fillInput(page.getLastNameFormElement(), 'Muppa');
    await page.fillInput(page.getEmailFormElement(), 'bharathmuppa@gmail.com');

    await page.fillInput(page.getFirstNameFormElement(), 'Bharath');
    await page.fillInput(page.getPasswordFormElement(), 'Mbharath8');

    await page.fillInput(page.getConfirmedPasswordFormElement(), 'Mbharath8');
    await page.getForm().submit();
    expect(browser.getCurrentUrl()).not.toContain('authorization/success');
  });

  it('should not navigate to success page on invalid credentials (password has last name in it)', async () => {

    await page.navigateTo();
    await browser.manage().window().maximize();

    await page.fillInput(page.getFirstNameFormElement(), 'Bharath');
    await page.fillInput(page.getEmailFormElement(), 'bharathmuppa@gmail.com');

    await page.fillInput(page.getLastNameFormElement(), 'Muppa');
    await page.fillInput(page.getPasswordFormElement(), '123Muppa8');

    await page.fillInput(page.getConfirmedPasswordFormElement(), '123Muppa8');
    await page.getForm().submit();
    expect(browser.getCurrentUrl()).not.toContain('authorization/success');
  });

  it('should not navigate to success page on invalid credentials (password didn\'t match confirmedPassword)', async () => {

    await page.navigateTo();
    await browser.manage().window().maximize();

    await page.fillInput(page.getFirstNameFormElement(), 'Bharath');
    await page.fillInput(page.getLastNameFormElement(), 'Muppa');
    await page.fillInput(page.getEmailFormElement(), 'bharathmuppa@gmail.com');

    await page.fillInput(page.getPasswordFormElement(), 'M@dsc1entist');
    await page.fillInput(page.getConfirmedPasswordFormElement(), 'M@dsc1entistsssss');

    await page.getForm().submit();
    expect(browser.getCurrentUrl()).not.toContain('authorization/success');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
