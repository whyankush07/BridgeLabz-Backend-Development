const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------------------------------------------
mongoose.connect('mongodb://localhost:27017/admin');
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model('User', userSchema);
// --------------------------------------------------------

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

app.use(logger);

const validation = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ msg: 'Name is required' });
    }
    next();
};

app.use(validation);

const checkAdmin = (req, res, next) => {
    // const isAdmin = req.headers['x-admin'] === 'true';
    const isAdmin = true;
    if (!isAdmin) {
        return res.status(403).json({ msg: 'Admin access required' });
    }
    next();
};

app.get("/", (req, res) => {
    try {
        return res.json("hlw...");
    } catch (error) {
        console.log("This error has been closed as: ", error.message);
    }
});

app.get('/admin', checkAdmin, (req, res) => {
    res.json({ message: 'Admin route is working!' });
});

app.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        return res.status(201).json({ msg: "User created successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal Server Error!!" });
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});