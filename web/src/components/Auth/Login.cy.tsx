import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import { expect } from "chai";

import { renderWithProvider } from "@/utils/test-utils";
import httpClient from "@/libs/axios/axios.config";

import { Login } from "./Login";

const mockAxios = new MockAdapter(httpClient);

describe("Login", () => {
  context("success", () => {
    it("renders login form correctly", () => {
      const initialState = {
        authReducer: {
          loading: false,
          isAuthenticated: false,
          user: undefined,
          error: undefined,
        },
      };

      renderWithProvider(
        <MemoryRouter>
          <Login />
        </MemoryRouter>,
        initialState,
      );

      cy.getByTestId("Login").should("exist");
      cy.getByTestId("Login_title").should("contain.text", "Welcome Back!");
      cy.getByTestId("Login_email_input").should("exist");
      cy.getByTestId("Login_password_input").should("exist");
      cy.getByTestId("Login_submit_button").should("exist");
    });

    it("calls login function when form is submitted", () => {
      const initialState = {
        authReducer: {
          loading: false,
          isAuthenticated: false,
          user: undefined,
          error: undefined,
        },
      };

      const data = {
        id: "1",
        username: "John Doe",
        email: "johndoe@gmail.com",
        avatarUrl: "https://i.pinimg.com/originals/dc/28/a7/dc28a77f18bfc9aaa51c3f61080edda5.jpg",
        accessToken: "5efb5f8a-212b-4b22-a201-ba2958005342",
      };
      mockAxios.onPost("/login").reply(200, data);

      const { store } = renderWithProvider(
        <MemoryRouter>
          <Login />
        </MemoryRouter>,
        initialState,
      );

      cy.getByTestId("Login_email_input").type("test@example.com");
      cy.getByTestId("Login_password_input").type("password123");
      cy.getByTestId("Login_submit_button")
        .click()
        .then(() => {
          const state = store.getState();
          expect(state.authReducer.loading).to.equal(false);
          expect(state.authReducer.isAuthenticated).to.equal(true);
          expect(state.authReducer.user).to.deep.equal(data);
          expect(state.authReducer.error).to.equal(undefined);
        });
    });
  });

  context("unsuccessful", () => {
    it("calls login function when form is submitted", () => {
      const initialState = {
        authReducer: {
          loading: false,
          isAuthenticated: false,
          user: undefined,
          error: undefined,
        },
      };

      const data = {
        message: "An error message.",
      };
      mockAxios.onPost("/login").reply(400, data);

      const { store } = renderWithProvider(
        <MemoryRouter>
          <Login />
        </MemoryRouter>,
        initialState,
      );

      cy.getByTestId("Login_email_input").type("test@example.com");
      cy.getByTestId("Login_password_input").type("password123");
      cy.getByTestId("Login_submit_button")
        .click()
        .then(() => {
          const state = store.getState();
          expect(state.authReducer.loading).to.equal(false);
          expect(state.authReducer.isAuthenticated).to.equal(false);
          expect(state.authReducer.user).to.equal(undefined);
          expect(state.authReducer.error).to.equal(data.message);
        });
    });
  });
});
