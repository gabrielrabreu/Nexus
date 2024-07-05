import { HomePage } from "./HomePage";

describe("HomePage", () => {
  it("renders home page correctly", () => {
    cy.mount(<HomePage />);

    cy.getByTestId("Home_title").should("contain", "Home");
  });
});
