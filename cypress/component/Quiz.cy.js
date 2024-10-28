import { mount } from "cypress/react";
import Quiz from "../../client/src/components/Quiz";

describee("Quiz component Test", () => {
  it("renders start Quiz button", () => {
    mount(<Quiz />);
    cy.contains("Start Quiz").should("be.visible");
  });
});
