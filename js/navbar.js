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
