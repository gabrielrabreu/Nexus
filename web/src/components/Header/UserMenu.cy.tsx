import { renderWithProvider } from "@/utils/test-utils";

import { UserMenu } from "./UserMenu";
import { MemoryRouter } from "react-router-dom";

describe("UserMenu", () => {
  it("renders user menu when visible", () => {
    const user = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
      avatarUrl: "https://example.com/avatar.jpg",
      accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
      darkMode: true,
    };

    const initialState = {
      authReducer: {
        loading: false,
        isAuthenticated: true,
        user: user,
        error: undefined,
      },
      skusReducer: {
        loading: false,
        skus: [],
        error: undefined,
      },
    };

    renderWithProvider(
      <MemoryRouter>
        <UserMenu isVisible={true} onClose={() => {}} />
      </MemoryRouter>,
      initialState,
    );

    cy.getByTestId("UserMenu").should("exist");
    cy.getByTestId("UserMenu_username_span").should("contain", "testuser");
    cy.getByTestId("UserMenu_email_span").should("contain", "test@example.com");
    cy.getByTestId("UserMenu_logout_button").should("contain", "Sign out");
    cy.getByTestId("UserMenu_close_button").should("contain", "Close");
  });

  it("does not render when isVisible is false", () => {
    const user = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
      avatarUrl: "https://example.com/avatar.jpg",
      accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
      darkMode: true,
    };

    const initialState = {
      authReducer: {
        loading: false,
        isAuthenticated: true,
        user: user,
        error: undefined,
      },
      skusReducer: {
        loading: false,
        skus: [],
        error: undefined,
      },
    };

    renderWithProvider(<UserMenu isVisible={false} onClose={() => {}} />, initialState);

    cy.getByTestId("UserMenu").should("not.exist");
  });

  it("calls onClose when close button is clicked", () => {
    const user = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
      avatarUrl: "https://example.com/avatar.jpg",
      accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
      darkMode: true,
    };

    const initialState = {
      authReducer: {
        loading: false,
        isAuthenticated: true,
        user: user,
        error: undefined,
      },
      skusReducer: {
        loading: false,
        skus: [],
        error: undefined,
      },
    };

    const onClose = cy.stub().as("onClose");

    renderWithProvider(
      <MemoryRouter>
        <UserMenu isVisible={true} onClose={onClose} />
      </MemoryRouter>,
      initialState,
    );

    cy.getByTestId("UserMenu_close_button").click();

    cy.get("@onClose").should("have.been.calledOnce");
  });

  it("calls logout when logout button is clicked", () => {
    const user = {
      id: "1",
      username: "testuser",
      email: "test@example.com",
      avatarUrl: "https://example.com/avatar.jpg",
      accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
      darkMode: true,
    };

    const initialState = {
      authReducer: {
        loading: false,
        isAuthenticated: true,
        user: user,
        error: undefined,
      },
      skusReducer: {
        loading: false,
        skus: [],
        error: undefined,
      },
    };

    const { store } = renderWithProvider(
      <MemoryRouter>
        <UserMenu isVisible={true} onClose={() => {}} />
      </MemoryRouter>,
      initialState,
    );

    cy.getByTestId("UserMenu_logout_button")
      .click()
      .then(() => {
        const state = store.getState();
        expect(state.authReducer.loading).to.equal(false);
        expect(state.authReducer.isAuthenticated).to.equal(false);
        expect(state.authReducer.user).to.equal(undefined);
        expect(state.authReducer.error).to.equal(undefined);
      });
  });
});
