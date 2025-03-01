document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");
    const passwordField = document.getElementById("password");
    const passwordStrength = document.getElementById("password-strength");
    const errorMessages = document.querySelectorAll(".error");

    // Clear error messages on input
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
            input.classList.remove("border-danger");
            input.nextElementSibling.textContent = "";
        });
    });

    // Password Strength Checker
    passwordField.addEventListener("input", () => {
        const password = passwordField.value;
        let strength = "Weak";

        if (password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password)) {
            strength = "Medium";
        }
        if (password.length >= 8 && /[@$!%*?&]/.test(password)) {
            strength = "Strong";
        }

        passwordStrength.textContent = `Password Strength: ${strength}`;
        passwordStrength.className = strength.toLowerCase();
    });

    // Form Validation
    form.addEventListener("submit", (event) => {
        let isValid = true;
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const password = document.getElementById("password");

        // Name Validation
        if (name.value.length < 3) {
            name.classList.add("border-danger");
            name.nextElementSibling.textContent = "Name must be at least 3 characters.";
            isValid = false;
        }

        // Email Validation
        if (!email.value.includes("@")) {
            email.classList.add("border-danger");
            email.nextElementSibling.textContent = "Enter a valid email.";
            isValid = false;
        }

        // Password Validation
        if (password.value.length < 6) {
            password.classList.add("border-danger");
            password.nextElementSibling.textContent = "Password must be at least 6 characters.";
            isValid = false;
        }

        if (!isValid) event.preventDefault();
    });

    // Client-Side Routing
    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetSection = document.querySelector(link.getAttribute("href"));
            document.querySelectorAll(".page").forEach(page => page.style.display = "none");
            targetSection.style.display = "block";
        });
    });
});
