const express = require('express');
const app = express();

const users = [
    { id: 1, name: "Kirito" },
    { id: 2, name: "Asuna" },
    { id: 3, name: "Kirigaya" }
];

app.get('/', (req, res) => {
    res.send("Name filter route in express js");
})

app.get('/users', (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.json(users);
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(name.toLowerCase())
    );

    res.json(filteredUsers);
});

app.listen(3000);
