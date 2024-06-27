import { renderWithProvider } from "@/utils/test-utils";

import App from "./App";

describe("App", () => {
  it("renders Loading component when loading is true", () => {
    const initialState = {
      authReducer: {
        loading: true,
        isAuthenticated: false,
        user: undefined,
        error: undefined,
      },
    };

    renderWithProvider(<App />, initialState);

    cy.getByTestId("Loading").should("exist");
  });

  it("renders Router component when loading is false", () => {
    const initialState = {
      authReducer: {
        loading: false,
        isAuthenticated: false,
        user: undefined,
        error: undefined,
      },
    };

    renderWithProvider(<App />, initialState);

    cy.getByTestId("Loading").should("not.exist");
  });
});
