import express from "express";
import path from "path";
import cors from "cors";  // Import CORS
import db from "./config/connection.js";
import routes from "./routes/index.js"; // Assuming you have index route

// **Add Here**: Await database connection and log success
await db();
console.log("Database connection established successfully");

const PORT = process.env.PORT || 3001;
const app = express();

// **Add Here**: Middleware Setup
// Enable CORS for cross-origin requests and setup URL parsing
app.use(cors());  // Add CORS middleware to allow cross-origin requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse incoming JSON payloads

// **Existing Code**: Route setup and API handling
app.use(routes);

// Serve Static Files in Production
if (process.env.NODE_ENV === "production") {
    const clientPath = path.resolve(__dirname, "../client/dist");
    app.use(express.static(clientPath));

    app.get("*", (_req, res) => {
        res.sendFile(path.resolve(clientPath, "index.html"));
    });
}

// **Existing Code**: Define the `/api/questions/random` route to serve questions
app.get("/api/questions/random", async (_req, res) => {
  console.log("Received GET request for /api/questions/random"); // Log to check if request hits the server
  try {
    const questions = [
      { id: 1, question: "What is 2 + 2?", choices: ["3", "4", "5"], answer: "4" },
      { id: 2, question: "What is the capital of France?", choices: ["Paris", "London", "Berlin"], answer: "Paris" },
      { id: 3, question: "What color is the sky?", choices: ["Blue", "Green", "Red"], answer: "Blue" },
    ];
    res.status(200).json(questions);
    console.log("Questions sent successfully");
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ message: "Failed to fetch questions." });
  }
});


// **Existing Code**: Start the server
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
});
