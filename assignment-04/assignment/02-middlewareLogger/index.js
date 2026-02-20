const express = require("express");
const app = express();

// Middleware to log response time
app.use((req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.originalUrl} - ${duration}ms`);
  });

  next();
});

app.get("/", (req, res) => {
  res.send("Hello Duniya!");
});

app.get("/users", (req, res) => {
  setTimeout(() => {
    res.send("Users List");
  }, 100);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
