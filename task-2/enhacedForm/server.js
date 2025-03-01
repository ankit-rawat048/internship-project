const express = require("express");
const bodyParser = require("body-parser");


const app = express();
const port = 3000;

// Temporary storage (for demonstration purposes only)
let users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/submit", (req, res) => {
    const { name, email, age, password, confirmPassword } = req.body;
    let errors = [];

    // Server-side validation
    if (name.length < 3) {
        errors.push("Name must be at least 3 characters long.");
    }
    if (!email.includes("@")) {
        errors.push("Please enter a valid email address.");
    }
    if (isNaN(age) || age < 18 || age > 100) {
        errors.push("Age must be a number between 18 and 100.");
    }
    if (password.length < 6) {
        errors.push("Password must be at least 6 characters long.");
    }
    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
        return res.render("index", { errors });
    }

    // Store validated user data
    users.push({ name, email, age });

    res.render("success", { name, email, age });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
