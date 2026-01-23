const http = require("http");
const url = require("url");

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  if (pathname === "/") {
    res.setHeader("Content-Type", "text/plain");
    res.end("Welcome to the Node.js HTTP Server!");
  } else if (pathname === "/about") {
    res.setHeader("Content-Type", "text/html");
    res.end(
      "<h1>About Us</h1> \
       <p>Hello, Duniya! <br>This is a simple HTTP server built with Node.js</p>"
    );
  } else if (pathname === "/user") {
    const query = parsedUrl.query;
    const name = query.name || "Guest";
    const age = query.age || "Unknown";

    const userData = {
      name: name,
      age: age,
      message: "User information retrieved successfully",
    };

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(userData));
  } else {
    res.setHeader("Content-Type", "text/plain");
    res.end("404 Page Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log("Available routes:");
  console.log("  / - Welcome message");
  console.log("  /about - About page");
  console.log("  /user?name=John&age=25 - User info");
});
