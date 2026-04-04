// js/navbar.js - Load navbar cleanly
document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.getElementById("navbar-placeholder");
  if (placeholder) {
    fetch("navbar.html")
      .then((response) => {
        if (!response.ok) throw new Error("Navbar file not found");
        return response.text();
      })
      .then((data) => {
        placeholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Error loading navbar:", error);
        // Fallback simple navbar if fetch fails
        placeholder.innerHTML = `
                    <nav style="background:#111; padding:15px 30px; display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #ff4ecd;">
                        <h1 style="margin:0; color:#ff4ecd; font-size:28px;">Market Place</h1>
                        <ul style="display:flex; list-style:none; gap:25px; margin:0; padding:0;">
                            <li><a href="index.html" style="color:#8fd3f4; text-decoration:none;">Home</a></li>
                            <li><a href="post.html" style="color:#8fd3f4; text-decoration:none;">Post Item</a></li>
                            <li><a href="cart.html" style="color:#8fd3f4; text-decoration:none;">Cart</a></li>
                            <li><a href="profile.html" style="color:#8fd3f4; text-decoration:none;">Profile</a></li>
                            <li><a href="signin.html" style="color:#8fd3f4; text-decoration:none;">Sign In</a></li>
                            <li><a href="signup.html" style="color:#8fd3f4; text-decoration:none;">Sign Up</a></li>
                        </ul>
                    </nav>
                `;
      });
  }
});
