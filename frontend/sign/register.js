const registerForm = document.getElementById("newaccoutid");
const message = document.createElement("p");
registerForm.appendChild(message);

const API = "http://127.0.0.1:8000";

registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fname = document.getElementById("fname").value.trim();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const pass2 = document.getElementById("pass2").value.trim();

    if (!fname || !email || !pass) {
        message.style.color = "red";
        message.textContent = "Name, Email, and Password are required.";
        return;
    }

    if (pass !== pass2) {
        message.style.color = "red";
        message.textContent = "Passwords do not match!";
        return;
    }

    try {
        const res = await fetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: fname, email: email, password: pass })
        });

        const data = await res.json();

        if (!res.ok) {
            message.style.color = "red";
            message.textContent = data.detail || "Registration failed.";
        } else {
            message.style.color = "green";
            message.textContent = "Account created! Redirecting to login...";

            setTimeout(() => {
                window.location.href = "./sing_in.html";
            }, 1500);
        }
    } catch (err) {
        message.style.color = "red";
        message.textContent = "Could not connect to server.";
        console.error(err);
    }
});
