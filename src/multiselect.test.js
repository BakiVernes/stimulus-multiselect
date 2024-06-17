import { Application } from '@hotwired/stimulus';
import Multiselect from '../src/multiselect';
import { fireEvent } from '@testing-library/dom';

describe('Multiselect', () => {
  let application;

  beforeAll(() => {
    application = Application.start();
    application.register('multiselect', Multiselect);
  });

  afterAll(() => {
    application.stop();
  });

  describe('with minimal structure', () => {
    beforeAll(() => {
      document.body.innerHTML = `
        <div data-controller="multiselect">
          <select data-multiselect-target='hidden' class='multiselect__hidden'>
          </select>
        </div>
      `;
    });

    it('should initialize correctly', () => {
      const element = document.querySelector('[data-controller="multiselect"]');
      expect(element).toBeInTheDocument();
    });
  });

  describe('when search-url is set', () => {
    describe('with NO params', () => {
      beforeAll(() => {
          document.body.innerHTML = `
          <div data-controller="multiselect" data-multiselect-search-url-value="/api/things.json" >
            <select data-multiselect-target='hidden' class='multiselect__hidden'>
            </select>
          </div>
        `;
      });


      it('should call a method from the controller', () => {
        const element = document.querySelector('[data-controller="multiselect"]');
        const controller = application.getControllerForElementAndIdentifier(element, 'multiselect');

        const searchInput = element.querySelector('.multiselect__search');

        // Ensure the search input element is found
        expect(searchInput).toBeInTheDocument();

        // Simulate typing into the search input
        fireEvent.input(searchInput, { target: { value: 'my query' } });

        console.log(controller.remoteSearchUrl());
        expect(controller.remoteSearchUrl()).toBe('/api/things.json?q=my+query&preselects=')
      });
    });

    describe('with params', () => {
      beforeAll(() => {
          document.body.innerHTML = `
          <div data-controller="multiselect" data-multiselect-search-url-value="/api/things.json?my_param=123" >
            <select data-multiselect-target='hidden' class='multiselect__hidden'>
            </select>
          </div>
        `;
      });


      it('should call a method from the controller', () => {
        const element = document.querySelector('[data-controller="multiselect"]');
        const controller = application.getControllerForElementAndIdentifier(element, 'multiselect');

        const searchInput = element.querySelector('.multiselect__search');

        // Ensure the search input element is found
        expect(searchInput).toBeInTheDocument();

        // Simulate typing into the search input
        fireEvent.input(searchInput, { target: { value: 'my query' } });

        console.log(controller.remoteSearchUrl());
        expect(controller.remoteSearchUrl()).toBe('/api/things.json?my_param=123&q=my+query&preselects=')
      });
    });
  });
});

