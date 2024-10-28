import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from './config/connection.js';

// Database connection
await db();

const PORT = process.env.PORT || 3001;
const app = express();

// __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define the /api/questions/random endpoint directly in this file
app.get("/api/questions/random", async (_req, res) => {
  try {
    // Mock data to simulate questions
    const questions = [
      { id: 1, question: "What is 2 + 2?", choices: ["3", "4", "5"], answer: "4" },
      { id: 2, question: "What is the capital of France?", choices: ["Paris", "London", "Berlin"], answer: "Paris" },
      { id: 3, question: "What color is the sky?", choices: ["Blue", "Green", "Red"], answer: "Blue" },
    ];

    // Send the mock questions as a response
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.resolve(__dirname, "../client/dist")));
  app.get("*", (_req, res) =>
    res.sendFile(path.resolve(__dirname, "../client/dist/index.html"))
  );
}

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
