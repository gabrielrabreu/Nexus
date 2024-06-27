import "@cypress/code-coverage/support";

import "./commands";

import { mount } from "cypress/react18";

Cypress.Commands.add("mount", mount);
