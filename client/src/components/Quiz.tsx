import { useState } from "react";
import type { Question } from "../models/Question.js";
import { getQuestions } from "../services/questionApi.js";

const Quiz = () => {
  // State to store the list of questions fetched from the server
  const [questions, setQuestions] = useState<Question[]>([]);
  // State to track the index of the current question being displayed
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State to keep track of the user's score
  const [score, setScore] = useState(0);
  // State to indicate if the quiz has been completed
  const [quizCompleted, setQuizCompleted] = useState(false);
  // State to indicate if the quiz has started
  const [quizStarted, setQuizStarted] = useState(false);

  // Function to fetch random questions from the API
  const getRandomQuestions = async () => {
    try {
      const questions = await getQuestions();

      // Check if questions were successfully fetched
      if (!questions) {
        throw new Error("something went wrong!");
      }

      // Set the questions in state
      setQuestions(questions);
    } catch (err) {
      console.error(err);
    }
  };

  // Function to handle when an answer is clicked
  const handleAnswerClick = (isCorrect: boolean) => {
    // Increment the score if the answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to the next question, or complete the quiz if it was the last question
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizCompleted(true);
    }
  };

  // Function to start the quiz
  const handleStartQuiz = async () => {
    await getRandomQuestions(); // Fetch questions from the API
    setQuizStarted(true); // Mark the quiz as started
    setQuizCompleted(false); // Reset quiz completed state
    setScore(0); // Reset score
    setCurrentQuestionIndex(0); // Reset current question index
  };

  // Render the start button if the quiz has not started yet
  if (!quizStarted) {
    return (
      <div className="p-4 text-center">
        <button
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>
      </div>
    );
  }

  // Render the completion screen if the quiz has been completed
  if (quizCompleted) {
    return (
      <div className="card p-4 text-center">
        <h2>Quiz Completed</h2>
        <div className="alert alert-success">
          Your score: {score}/{questions.length}
        </div>
        <button
          className="btn btn-primary d-inline-block mx-auto"
          onClick={handleStartQuiz}
        >
          Take New Quiz
        </button>
      </div>
    );
  }

  // Render a loading spinner while the questions are being fetched
  if (questions.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // Get the current question to display
  const currentQuestion = questions[currentQuestionIndex];

  // Render the current question and answer options
  return (
    <div className="card p-4">
      <h2>{currentQuestion.question}</h2>
      <div className="mt-3">
        {currentQuestion.answers.map((answer, index) => (
          <div key={index} className="d-flex align-items-center mb-2">
            <button
              className="btn btn-primary"
              onClick={() => handleAnswerClick(answer.isCorrect)}
            >
              {index + 1}
            </button>
            <div className="alert alert-secondary mb-0 ms-2 flex-grow-1">
              {answer.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
