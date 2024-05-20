declare namespace Cypress {
  interface Chainable {
    getByTestId(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;

    getToastify(): Chainable<JQuery<HTMLElement>>;

    login(): void;
  }
}
