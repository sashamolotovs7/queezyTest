describe("Tech Quiz End-to-End Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should start the quiz and answer all questions", () => {
    // Start quiz
    cy.get("button").contains("Start Quiz").click();

    // Answer questions until complete
    for (let i = 0; i < 10; i++) {
      cy.get(".btn-primary").first().click(); // Answer each question
    }

    // Verify score is displayed
    cy.get("h2").contains("Quiz Completed").should("be.visible");
    cy.get(".alert").contains("Your score").should("be.visible");

    // Start a new quiz
    cy.get("button").contains("Take New Quiz").click();
    cy.get("button").contains("Start Quiz").should("be.visible");
  });
});
