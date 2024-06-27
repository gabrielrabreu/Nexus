import { mount } from "cypress/react";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      getByTestId(dataTestAttribute: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}
