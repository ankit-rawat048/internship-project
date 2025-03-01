const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const { name, email } = req.body;
    res.render("success", { name, email });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
