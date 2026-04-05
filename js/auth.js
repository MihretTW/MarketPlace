// Signin function - Updated
async function handleSignin(email, password) {
  const result = await apiCall("signin", { email, password });

  if (result.status === "success") {
    // Save user to localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: result.username || result.user, // support both
        email: email,
      }),
    );

    const username = result.username || result.user || "User";
    alert("✅ Welcome, " + username + "!");
    window.location.href = "index.html";
  } else {
    alert("❌ " + (result.message || "Login failed"));
  }
}

// Improved checkAuth that also verifies with server
async function checkAuth() {
  // First check localStorage (fast)
  const savedUser = localStorage.getItem("user");
  if (!savedUser) {
    return { loggedin: false };
  }

  // Also verify with server (more reliable)
  try {
    const response = await fetch("php/check_auth.php");
    const data = await response.json();

    if (data.loggedin) {
      return {
        loggedin: true,
        username: data.username,
      };
    } else {
      localStorage.removeItem("user"); // Clean up invalid session
      return { loggedin: false };
    }
  } catch (error) {
    // If server check fails, fall back to localStorage
    const user = JSON.parse(savedUser);
    return {
      loggedin: true,
      username: user.username,
    };
  }
}
