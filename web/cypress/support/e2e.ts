import "@cypress/code-coverage/support";

import { PATH } from "../../src/constants/paths";

import "./commands";

Cypress.Commands.add("getToastify", () => {
  return cy.get("[class=Toastify__toast-body] div:eq(1)");
});

Cypress.Commands.add("login", () => {
  cy.intercept("POST", `${Cypress.env("apiUrl")}/login`, {
    fixture: "login.json",
  });

  cy.visit(PATH.LOGIN);

  cy.getByTestId("Login_email_input").type("mail@mail");
  cy.getByTestId("Login_password_input").type("Pass!123");
  cy.getByTestId("Login_submit_button").click();

  cy.url().should("include", PATH.HOME);
});
