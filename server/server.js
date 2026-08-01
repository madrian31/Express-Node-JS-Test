const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

let users = [
    { id: 1, name: "Juan", age: 25 },
    { id: 2, name: "Pedro", age: 30 }
];

// READ
app.get("/api/users", (req, res) => {
    res.json(users);
});

// CREATE
app.post("/api/users", (req, res) => {
    const { name, age } = req.body;

    const newUser = {
        id: users.length + 1,
        name: name,
        age: age
    };

    users.push(newUser);

    res.json(newUser);
});

// UPDATE
app.put("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const { name, age } = req.body;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.name = name;
    user.age = age;

    res.json(user);
});

// DELETE
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const userExists = users.some((user) => user.id === id);

    if (!userExists) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users = users.filter((user) => user.id !== id);

    res.json({
        message: "User deleted successfully"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});