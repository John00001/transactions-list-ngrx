import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(route: string = ''): Promise<unknown> {
    return browser.get(`${browser.baseUrl}/${route}`) as Promise<unknown>;
  }

  checkPresence(selector): void {
    const el = this.selectElement(selector);

    if (el) {
      expect(el.isPresent()).toBeTruthy();
    }
  }

  selectElement(selector): ElementFinder {
    switch (selector.searchBy) {
      case 'tag':
        return element(by.tagName(selector.text));
        break;

      case 'id':
        return element(by.id(selector.text));
        break;

      case 'class':
        return element(by.className(selector.text));
        break;

      default:
        return null;
        break;
    }
  }
}
