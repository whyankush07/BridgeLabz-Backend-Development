const express = require('express');
const users = require("./users.json")

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
    try {
        const id = req.query.id;
        if (!id) return res.status(200).json(users);
        const index = users.findIndex(u => u.id == id);
        if (index == -1) return res.status(404).json({"message" : "User not found!!"});
        res.status(200).json(users[index])
    } catch (error) {
        console.error(error)
       return res.status(500).json({"message" : "Internal Server Error!!"}) 
    }
});

app.post("/", (req, res) => {
    try {
        const newUser = req.body;
        users.push(newUser)
        return res.status(200).json({ "message": "User added successfully", "Updated user": newUser})
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error in server" });
    }
});

app.patch("/", (req, res) => {
    try {
        const { id, name, email } = req.query;
        const index = users.findIndex(u => u.id == id);
        if (index == -1) {
            console.log("User not found")
            return res.status(404).json({ "Message": "User not found" })
        }
        users[index].first_name = name;
        users[index].email = email;
        return res.status(200).json({ "message": "user updated successfully", "Updated user": users[index] })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error in server" });
    }
});

app.delete("/", (req, res) => {
    try {
        const { id } = req.query;
        const index = users.findIndex(u => u.id == id);
        if (index == -1) {
            console.log("User not found")
            return res.status(404).json({ "Message": "User not found" })
        }
        users.splice(index, 1);
        return res.status(200).json({ "message": "user updated successfully", "Updated users": users })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ "message": "Error in server" });
    }
});

app.listen(3000, () => {
    console.log("Ankush is best!!")
});