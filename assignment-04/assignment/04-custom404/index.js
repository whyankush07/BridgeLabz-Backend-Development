const express = require("express");
const app = express();

app.set("view engine", "ejs");

// Normal route
app.get("/", (req, res) => {
  res.render("home");
});

// Custom 404 middleware 
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
