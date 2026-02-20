const express = require("express");
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set("view engine", "ejs");

// GET route → show form
app.get("/contact", (req, res) => {
  res.render("contact");
});

// POST route → handle form submission
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  console.log("Form Data Received:");
  console.log(name, email, message);

  res.send("Form submitted successfully!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
