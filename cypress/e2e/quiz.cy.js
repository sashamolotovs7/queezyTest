describe("Tech Quiz End-to-End Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/quiz"); // Adjust the URL if needed
  });

  it("should start the quiz and answer all questions", () => {
    // Wait for the document to become ready
    cy.document().its('readyState').should('eq', 'complete');

    // Adding an extra wait for any dynamic JavaScript to load
    cy.wait(3000); // Adjust this value if needed

    // Use a more resilient selector to find the button
    cy.get('button[id="start-quiz-button"], button:contains("Start Quiz")', { timeout: 20000 })
      .should('be.visible')
      .click();

    // Adding an extra wait to ensure that quiz questions are loaded
    cy.wait(3000); // Adjust this value if needed

    // Ensure the quiz question exists before interacting
    cy.get(".quiz-question", { timeout: 20000 }).should("exist").each(($el) => {
    cy.get("../")
      // Find the radio button answer within each question
      cy.wrap($el)
        .find('input[type="radio"]', { timeout: 5000 })
        .first()
        .check({ force: true }); // Select an answer

      // Click "Next" after selecting an answer
      cy.wrap($el)
        .find('button[id="next-button"], button:contains("Next")', { timeout: 10000 })
        .should('be.visible')
        .click(); 
    });

    // Verify that the quiz is completed
    cy.get("h2", { timeout: 20000 }).should("contain", "Quiz Completed");
    cy.get(".alert").contains("Your score").should("be.visible");

    // Start a new quiz
    cy.get('button:contains("Take New Quiz")', { timeout: 10000 }).should("be.visible").click();
    cy.get('button:contains("Start Quiz")', { timeout: 10000 }).should("be.visible");
  });
});
