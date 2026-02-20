const express = require("express");
const app = express();

app.use(express.json());

let users = [
  { id: 1, name: "Kirito", email: "kirito@mail.com", role: "Admin" },
  { id: 2, name: "Asuna", email: "asuna@mail.com", role: "User" },
];

// Logger middleware
app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

// Validation middleware
function validateUser(req, res, next) {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res
      .status(400)
      .json({ error: "Invalid input. All fields are required." });
  }

  next();
}

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json(user);
});

// Create user
app.post("/users", validateUser, (req, res) => {
  const { name, email, role } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email,
    role,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// Update user
app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { name, email, role } = req.body;

  if (!name && !email && !role) {
    return res
      .status(400)
      .json({ error: "Invalid input. At least one field required." });
  }

  if (name) user.name = name;
  if (email) user.email = email;
  if (role) user.role = role;

  res.json(user);
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  users.splice(index, 1);
  res.json({ message: "User deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
