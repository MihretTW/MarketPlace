// js/navbar.js
document.addEventListener("DOMContentLoaded", function () {
  const placeholder = document.getElementById("navbar-placeholder");

  if (placeholder) {
    fetch("navbar.html")
      .then((response) => response.text())
      .then((data) => {
        placeholder.innerHTML = data;
      })
      .catch((error) => {
        console.error("Navbar load error:", error);
      });
  }
});

checkAuth().then((auth) => {
  if (auth.loggedin) {
    // Show logged in navbar with username
    console.log("Welcome back, " + auth.username);
  } else {
    // Show login links
  }
});
