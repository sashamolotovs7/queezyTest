import type { Question } from "../models/Question.js";

export const getQuestions = async () => {
  try {
    const response = await fetch("/api/questions/random");
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in getQuestions:", error);
    return null;
  }
};

