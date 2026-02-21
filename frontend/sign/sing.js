const loginForm = document.getElementById("loginForm");
const message = document.getElementById("massge");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("pass");

const API = "http://127.0.0.1:8000";

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passInput.value.trim();

  if (!email || !password) {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      message.style.color = "red";
      message.textContent = data.detail || "Login failed.";
    } else {
      message.style.color = "green";
      message.textContent = "Login successful! Redirecting...";

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect to home
      setTimeout(() => {
        window.location.href = "../home/home.html";
      }, 1000);
    }
  } catch (err) {
    message.style.color = "red";
    message.textContent = "Could not connect to server.";
    console.error(err);
  }
});