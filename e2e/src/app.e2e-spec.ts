import { AppPage } from './app.po';
import { browser, by, element, logging } from 'protractor';
import { repeat } from 'rxjs/operators';

describe('workspace-project App', () => {
  let page: AppPage;
  const selectors = {
    navbarComponent: {
      text: 'app-navbar',
      searchBy: 'tag'
    },
    homeComponent: {
      text: 'app-home',
      searchBy: 'tag'
    },
    transactionsComponent: {
      text: 'app-transactions',
      searchBy: 'tag'
    },
    footerComponent: {
      text: 'app-footer',
      searchBy: 'tag'
    },
    homeRoute: {
      text: 'home-route',
      searchBy: 'id'
    },
    transactionsRoute: {
      text: 'transactions-route',
      searchBy: 'id'
    },
    transactionsList: {
      text: 'transactions-scroll-viewport',
      searchBy: 'class'
    },
    transactionsListItem: {
      text: 'transaction-item',
      searchBy: 'class'
    }
  };

  beforeEach(() => {
    page = new AppPage();
  });

  describe('General routing and layouting tests', () => {

    it('should navigate to home by default', () => {
      page.navigateTo();
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf('home') !== -1).toBeTruthy();
      });
    });

    it('should navigate to home when wrong route', () => {
      page.navigateTo('abcd');
      browser.getCurrentUrl().then((actualUrl) => {
        expect(actualUrl.indexOf('home') !== -1).toBeTruthy();
      });
    });

    it('should check the home page structure - navbar, home, footer', () => {
      page.navigateTo('home');
      page.checkPresence(selectors.navbarComponent);
      page.checkPresence(selectors.homeComponent);
      page.checkPresence(selectors.footerComponent);
    });

    it('should have home and transactions items with the right text', () => {
      page.navigateTo('home');

      page.checkPresence(selectors.homeRoute);
      page.checkPresence(selectors.transactionsRoute);

      page.selectElement(selectors.homeRoute).getText().then((text) => {
        expect(text).toEqual('Home');
      });

      page.selectElement(selectors.transactionsRoute).getText().then((text) => {
        expect(text).toEqual('Transactions');
      });
    });

    it('should navigate to transactions when click on transactions item when we are on home', () => {
      page.navigateTo('home');

      page.selectElement(selectors.transactionsRoute).click().then((text) => {
        browser.sleep(2000).then(() => {
          browser.getCurrentUrl().then((actualUrl: string) => {
            expect(actualUrl.indexOf('transactions') !== -1).toBeTruthy();
          });
        });
      });
    });

    it('should navigate to home when click on home item from navbar when we are on transactions', () => {
      page.navigateTo('transactions');

      page.selectElement(selectors.homeRoute).click().then((text) => {
        browser.sleep(2000).then(() => {
          browser.getCurrentUrl().then((actualUrl: string) => {
            expect(actualUrl.indexOf('home') !== -1).toBeTruthy();
          });
        });
      });
    });

    it('should check the transactions page structure - navbar, transactions, footer', () => {
      page.navigateTo('transactions');
      page.checkPresence(selectors.navbarComponent);
      page.checkPresence(selectors.transactionsComponent);
      page.checkPresence(selectors.footerComponent);
    });

  });

  describe('Transactions flow', () => {
    beforeEach(() => {
      page.navigateTo('home');
      page.selectElement(selectors.transactionsRoute).click();
    });

    it('should have the transactions list', () => {
      page.checkPresence(selectors.transactionsList);
    });

    it('should have the transactions items inside the list', () => {
      browser.sleep(2000).then(() => {
        expect(element.all(by.className(selectors.transactionsListItem.text)).count()).toBeGreaterThan(5);
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE
    } as logging.Entry));
  });
});
