import { Application } from '@hotwired/stimulus';
import Multiselect from '../src/multiselect';

describe('Multiselect', () => {
  let application;

  beforeAll(() => {
    document.body.innerHTML = `
      <div data-controller="multiselect">
        <select data-multiselect-target='hidden' class='multiselect__hidden'>
        </select>
      </div>
    `;

    application = Application.start();
    application.register('multiselect', Multiselect);
  });

  afterAll(() => {
    application.stop();
  });

  it('should initialize correctly', () => {
    const element = document.querySelector('[data-controller="multiselect"]');
    expect(element).toBeInTheDocument();
    // Add more assertions based on your controller's behavior
  });

  // Add more tests for different behaviors of your controller
});

