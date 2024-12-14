import React, { useState } from "react";
import "../styles.css"; // Import the CSS file
const RecipeForm = () => {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ ingredients: "", cuisine: "" });

  const validateForm = () => {
    const newErrors = { ingredients: "", cuisine: "" };

    if (!ingredients.trim()) {
      newErrors.ingredients = "Ingredients field cannot be empty.";
    }
    if (!cuisine.trim()) {
      newErrors.cuisine = "Cuisine field cannot be empty.";
    }

    setErrors(newErrors);

    // Return true if no errors exist
    return !newErrors.ingredients && !newErrors.cuisine;
  };

  const handleGenerateStream = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    setRecipe(""); // Clear previous recipe
    setLoading(true); // Show loading state
    setErrors({ ingredients: "", cuisine: "" }); // Reset errors

    try {
      const response = await fetch(
        "http://localhost:5000/generate-recipe-stream",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ingredients, cuisine }),
        }
      );

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break; // End of stream

        // Decode and append each chunk
        fullText += decoder.decode(value);
        setRecipe((prev) => prev + decoder.decode(value)); // Update displayed recipe
      }
    } catch (error) {
      console.error("Error streaming recipe:", error);
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Recipe Generator</h1>
      <form onSubmit={handleGenerateStream} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter ingredients (comma-separated)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            style={styles.input}
          />
          {errors.ingredients && (
            <p style={styles.error}>{errors.ingredients}</p>
          )}
        </div>
        <div style={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter cuisine type"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
            style={styles.input}
          />
          {errors.cuisine && <p style={styles.error}>{errors.cuisine}</p>}
        </div>
        <button type="submit" style={styles.button}>
          Generate Recipe
        </button>
      </form>
      {loading && <p style={styles.loading}>Loading your recipe...</p>}
      {recipe && (
        <div style={styles.recipeBox}>
          <h2>Generated Recipe:</h2>
          <pre style={styles.pre}>{recipe}</pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
    padding: "0 10px", // Add some padding for smaller screens
  },
  header: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  form: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%", // Full width for responsiveness
    maxWidth: "400px", // Limit width on larger screens
    padding: "10px",
    margin: "0 auto",
    boxSizing: "border-box",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
  loading: {
    marginTop: "20px",
    fontSize: "1.2rem",
    color: "#555",
  },
  recipeBox: {
    marginTop: "20px",
    textAlign: "left",
    padding: "20px",
    border: "1px solid #ccc",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
    maxWidth: "90%", // Make responsive
    margin: "0 auto",
    maxHeight: "400px",
    overflowY: "auto",
  },
  pre: {
    fontSize: "1rem",
    lineHeight: "1.5",
  },
};

export default RecipeForm;
