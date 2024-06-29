import { PATH } from "../../src/constants/paths";

describe("Header", () => {
  context("successful", () => {
    beforeEach(() => {
      cy.login();
    });

    it("should render with success", () => {
      cy.getByTestId("Header_logo_img").should("be.visible");
      cy.getByTestId("Header_home_link").should("be.visible");
      cy.getByTestId("Header_userAvatar_button").should("be.visible");
    });

    it("should logout on click", () => {
      cy.getByTestId("Header_userAvatar_button").click();
      cy.getByTestId("UserMenu_logout_button").click();

      cy.url().should("include", PATH.LOGIN);
    });
  });
});
