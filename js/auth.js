// Simple fetch helper
async function apiCall(endpoint, data) {
  try {
    const response = await fetch(`php/${endpoint}.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    return { status: "error", message: "Connection failed" };
  }
}

// Signup function
async function handleSignup(username, email, password) {
  const result = await apiCall("signup", { username, email, password });

  if (result.status === "success") {
    alert("✅ Account created! Please sign in.");
    window.location.href = "signin.html";
  } else {
    alert("❌ " + result.message);
  }
}

// Signin function
async function handleSignin(email, password) {
  const result = await apiCall("signin", { email, password });

  if (result.status === "success") {
    // Save user to localStorage for simple session
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: result.user,
        email: email,
      }),
    );
    alert("✅ Welcome, " + result.user + "!");
    window.location.href = "index.html";
  } else {
    alert("❌ " + result.message);
  }
}

// Check if user is logged in
function checkAuth() {
  return localStorage.getItem("user") !== null;
}

// Logout
function handleLogout() {
  localStorage.removeItem("user");
  window.location.href = "signin.html";
}
