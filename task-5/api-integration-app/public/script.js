document.addEventListener("DOMContentLoaded", () => {
    const userForm = document.getElementById("userForm");
    const userList = document.getElementById("userList");

    // Fetch users from API
    function fetchUsers() {
        fetch("http://localhost:3000/api/users")
            .then(response => response.json())
            .then(users => {
                userList.innerHTML = ""; // Clear list
                users.forEach(user => {
                    const div = document.createElement("div");
                    div.innerHTML = `${user.name} (${user.email}) 
                    <button onclick="deleteUser(${user.id})">❌</button>`;
                    userList.appendChild(div);
                });
            });
    }

    // Add new user
    userForm.addEventListener("submit", event => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email })
        }).then(() => {
            userForm.reset();
            fetchUsers(); // Refresh list
        });
    });

    // Delete user function
    window.deleteUser = (id) => {
        fetch(`http://localhost:3000/api/users/${id}`, { method: "DELETE" })
            .then(() => fetchUsers()); // Refresh list
    };

    fetchUsers(); // Load users on page load
});
