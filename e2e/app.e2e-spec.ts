import { AngularTestPage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Starting tests for client', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be client', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('client');
    })
  });

  it('navbar-brand should be my-network@0.1.9',() => {
    var navbarBrand = element(by.css('.navbar-brand')).getWebElement();
    expect(navbarBrand.getText()).toBe('my-network@0.1.9');
  });

  
    it('TestProdItem component should be loadable',() => {
      page.navigateTo('/TestProdItem');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('TestProdItem');
    });

    it('TestProdItem table should have 9 columns',() => {
      page.navigateTo('/TestProdItem');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(9); // Addition of 1 for 'Action' column
      });
    });

  
    it('TestAsn component should be loadable',() => {
      page.navigateTo('/TestAsn');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('TestAsn');
    });

    it('TestAsn table should have 6 columns',() => {
      page.navigateTo('/TestAsn');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('TestOrder component should be loadable',() => {
      page.navigateTo('/TestOrder');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('TestOrder');
    });

    it('TestOrder table should have 4 columns',() => {
      page.navigateTo('/TestOrder');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(4); // Addition of 1 for 'Action' column
      });
    });

  
    it('ProductItem component should be loadable',() => {
      page.navigateTo('/ProductItem');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('ProductItem');
    });

    it('ProductItem table should have 5 columns',() => {
      page.navigateTo('/ProductItem');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  
    it('ProductInfo component should be loadable',() => {
      page.navigateTo('/ProductInfo');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('ProductInfo');
    });

    it('ProductInfo table should have 6 columns',() => {
      page.navigateTo('/ProductInfo');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Product component should be loadable',() => {
      page.navigateTo('/Product');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Product');
    });

    it('Product table should have 5 columns',() => {
      page.navigateTo('/Product');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });

  
    it('Contact component should be loadable',() => {
      page.navigateTo('/Contact');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Contact');
    });

    it('Contact table should have 6 columns',() => {
      page.navigateTo('/Contact');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Organization component should be loadable',() => {
      page.navigateTo('/Organization');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Organization');
    });

    it('Organization table should have 6 columns',() => {
      page.navigateTo('/Organization');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  
    it('Commodity component should be loadable',() => {
      page.navigateTo('/Commodity');
      var assetName = browser.findElement(by.id('assetName'));
      expect(assetName.getText()).toBe('Commodity');
    });

    it('Commodity table should have 6 columns',() => {
      page.navigateTo('/Commodity');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(6); // Addition of 1 for 'Action' column
      });
    });

  

});
