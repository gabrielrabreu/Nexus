import { PATH } from "../../src/constants/paths";

describe("Login", () => {
  context("unsuccessful", () => {
    beforeEach(() => {
      cy.intercept("POST", `${Cypress.env("apiUrl")}/login`, {
        statusCode: 400,
        fixture: "bad-request.json",
      });
    });

    it("toasts error message when submit failed", () => {
      cy.visit(PATH.LOGIN);

      cy.getByTestId("Login_email_input").type("mail@mail");
      cy.getByTestId("Login_password_input").type("Pass!123");
      cy.getByTestId("Login_submit_button").click();

      cy.getToastify().should("be.visible");
      cy.url().should("include", PATH.LOGIN);
    });
  });

  context("successful", () => {
    beforeEach(() => {
      cy.intercept("POST", `${Cypress.env("apiUrl")}/login`, {
        fixture: "login.json",
      });
    });

    it("renders login route correctly", () => {
      cy.visit(PATH.LOGIN);

      cy.getByTestId("Login_title").should("be.visible");
      cy.url().should("include", PATH.LOGIN);
    });

    it("submits login form with valid credentials", () => {
      cy.visit(PATH.LOGIN);

      cy.getByTestId("Login_email_input").type("mail@mail");
      cy.getByTestId("Login_password_input").type("Pass!123");
      cy.getByTestId("Login_submit_button").click();

      cy.url().should("include", PATH.HOME);
    });
  });
});
