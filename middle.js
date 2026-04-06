const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});