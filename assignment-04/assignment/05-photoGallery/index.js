const express = require("express");
const app = express();
const path = require("path");

// Set EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Route to gallery
app.get("/gallery", (req, res) => {
  const images = [
    "images/photo1.png",
    "images/photo2.png",
    "images/photo3.png",
  ];

  res.render("gallery", { images });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
