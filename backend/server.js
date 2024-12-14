require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.use(cors());
app.use(bodyParser.json());

app.post("/generate-recipe-stream", async (req, res) => {
  const { ingredients, cuisine } = req.body;

  if (!ingredients || !cuisine) {
    return res
      .status(400)
      .json({ error: "Ingredients and cuisine are required" });
  }

  const prompt = `
    Create a recipe using the following ingredients: ${ingredients}.
    The cuisine type is: ${cuisine}.
    Format the recipe as follows:
    1. List the ingredients one by one.
    2. Provide step-by-step cooking instructions.
    `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Set headers to enable streaming
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const result = await model.generateContentStream(prompt);

    // Stream the response chunks to the client
    for await (const chunk of result.stream) {
      res.write(chunk.text()); // Send each chunk to the client
    }

    res.end(); // End the stream
  } catch (error) {
    console.error("Error streaming recipe:", error.message);
    res.status(500).json({ error: "Failed to stream recipe" });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
