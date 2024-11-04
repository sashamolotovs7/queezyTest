import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock questions endpoint
// Mock questions endpoint
app.get("/api/questions/random", (_req, res) => {
  console.log("Fetching questions..."); // Added this line 
  try {
    const questions = [
      { id: 1, question: "What is 2 + 2?", choices: ["3", "4", "5"], answer: "4" },
      { id: 2, question: "What is the capital of France?", choices: ["Paris", "London", "Berlin"], answer: "Paris" },
      { id: 3, question: "What color is the sky?", choices: ["Blue", "Green", "Red"], answer: "Blue" },
    ];
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});


// Serve Static Files in Production
if (process.env.NODE_ENV === "production") {
  const clientPath = path.resolve(__dirname, "../client/dist");
  app.use(express.static(clientPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.resolve(clientPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
