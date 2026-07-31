const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

app.get("/api/message", (req, res) => {
    res.json({
        message: "Hello from the server!",
        corsTest: "CORS IS WORKING"
    });
});

app.post("/api/greet", (req, res) => {
    const { name } = req.body;

    res.json({
        message: `Hello, ${name}!`
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});