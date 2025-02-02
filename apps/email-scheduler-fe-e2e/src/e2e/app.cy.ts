import { getGreeting } from "../support/app.po";

describe("email-scheduler-fe-e2e", () => {
  beforeEach(() => cy.visit("/"));

  it("should display welcome message", () => {
    // Custom command example, see `../support/commands.ts` file

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains(/Welcome/);
  });
});
