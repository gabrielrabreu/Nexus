import { PATH } from "../../src/constants/paths";

describe("Home", () => {
  context("successful", () => {
    beforeEach(() => {
      cy.login();
    });

    it("renders home route correctly", () => {
      cy.visit(PATH.HOME);

      cy.getByTestId("Home_title").should("be.visible");
      cy.url().should("include", PATH.HOME);
    });
  });
});
