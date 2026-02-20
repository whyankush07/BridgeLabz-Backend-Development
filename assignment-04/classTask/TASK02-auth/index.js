const express = require('express');
const app = express();

app.use(express.json());

let users = [
    { id: 1, email: "kirito@mail.com", password: "1234", role: "Admin" },
    { id: 2, email: "asuna@mail.com", password: "5678", role: "User" }
];

let validTokens = [];

// Login route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = "token-" + user.id + "-" + Date.now();
    validTokens.push(token);

    res.json({ message: "Login successful", token });
});

// Authentication middleware
function authenticate(req, res, next) {
    const token = req.headers['authorization'];

    if (!token || !validTokens.includes(token)) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    next();
}

// Protected dashboard route
app.get('/dashboard', authenticate, (req, res) => {
    res.json({ message: "Welcome to Dashboard" });
});

// Protected profile route
app.get('/profile', authenticate, (req, res) => {
    res.json({ message: "Welcome to Profile" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
