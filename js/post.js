// js/post.js - Handle posting item with image

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("postForm");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch("php/add_item.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          showMessage("Item posted successfully! 🎉", "success");
          form.reset();
        } else {
          showMessage(data.message || "Failed to post item", "error");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        showMessage("Something went wrong. Check your image size.", "error");
      });
  });

  function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    setTimeout(() => {
      messageDiv.textContent = "";
      messageDiv.className = "message";
    }, 5000);
  }
});
