import { Home } from "./Home";

describe("Home", () => {
  it("renders home component correctly", () => {
    cy.mount(<Home />);

    cy.getByTestId("Home_title").should("contain", "Home");
  });
});
