import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import { App } from "./App/App.tsx";
import { setupAxiosSandbox } from "./libs/axios/axios.sandbox.ts";
import { httpClient } from "./libs/axios/axios.config.ts";
import { store } from "./store/store.ts";

import "./index.css";

import "react-toastify/dist/ReactToastify.css";

if (import.meta.env.MODE === "sandbox") {
  setupAxiosSandbox(httpClient);
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
);
