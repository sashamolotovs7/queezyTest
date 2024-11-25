/// <reference types="cypress" />

context("Misc", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/commands/misc");
  });

  it("cy.exec() - execute a system command", () => {
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);

    // Check for Windows environment and avoid using 'cat' which is a Linux command
    if (Cypress.platform === "win32") {
      // Use 'type' command for Windows to read files
      cy.exec(`type ${Cypress.config("configFile")}`, { failOnNonZeroExit: false })
        .its("stderr")
        .should("be.empty");
    } else {
      // Use 'cat' command for Unix-like systems
      cy.exec(`cat ${Cypress.config("configFile")}`, { failOnNonZeroExit: false })
        .its("stderr")
        .should("be.empty");

      cy.exec("pwd", { failOnNonZeroExit: false })
        .its("code")
        .should("eq", 0);
    }
  });

  it("cy.focused() - get the DOM element that has focus", () => {
    cy.get(".misc-form").find("#name").click();
    cy.focused().should("have.id", "name");

    cy.get(".misc-form").find("#description").click();
    cy.focused().should("have.id", "description");
  });

  context("Cypress.Screenshot", function () {
    it("cy.screenshot() - take a screenshot", () => {
      cy.screenshot("my-image");
    });

    it("Cypress.Screenshot.defaults() - change default config of screenshots", function () {
      Cypress.Screenshot.defaults({
        blackout: [".foo"],
        capture: "viewport",
        clip: { x: 0, y: 0, width: 200, height: 200 },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        onBeforeScreenshot() {},
        onAfterScreenshot() {},
      });
    });
  });

  it("cy.wrap() - wrap an object", () => {
    cy.wrap({ foo: "bar" })
      .should("have.property", "foo")
      .and("include", "bar");
  });
});
