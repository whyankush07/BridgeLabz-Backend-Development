const express = require("express");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const users = [
    { name: "Mayank", id: 1, marks: 90, section: "K" },
    { name: "Yash", id: 2, marks: 80, section: "K" },
]

app.get("/", (req, res) => {
    res.status(200).json(users);
})

app.post("/", (req, res) => {
    try {
        const { name, section, id, marks } = req.body;
        const user = { name, section, id, marks };
        users.push(user);
        res.status(201).json({ "Message": "User created successfully!!" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ "Message": "Internal server error!!" })
    }
})

app.patch("/", (req, res) => {
    try {
        const { id, section, name, marks } = req.body;
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            return res.status(404).json({ "Message": "User not found!!" });
        }
        users[index].section = section;
        users[index].name = name;
        users[index].marks = marks;
        res.status(203).json({ "Message": "User's section updated successfully" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ "Message": "Internal server error!!" })
    }
})

app.delete("/", (req, res) => {
    try {
        const { id } = req.body;
        const index = users.findIndex(u => u.id === id);
        if (index === -1) {
            return res.status(404).json({ "Message": "User not found!!" });
        }
        if (users[index].marks >= 70) {
            return res.status(400).json({ "Message": "Cannot delete user with marks greater than or equal to 70!!" });
        }
        users.splice(index, 1);
        res.status(200).json({ "Message": "User deleted successfully!!" })
    } catch (error) {
        console.error(error)
        res.status(500).json({ "Message": "Internal server error!!" })
    }
})

app.listen(3000, () => {
    console.log("Hi, myself Ankush!!!");
})