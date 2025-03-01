const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const { name, email, password } = req.body;
    res.render("success", { name });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
