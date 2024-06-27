import { Loading } from "./Loading";

describe("Loading", () => {
  it("renders loading component correctly", () => {
    cy.mount(<Loading />);

    cy.getByTestId("Loading_text").should("contain", "Loading ...");
    cy.getByTestId("Loading_svg").should("exist");
  });
});
