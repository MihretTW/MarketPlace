// js/post.js - Simple item posting

// Get current user from localStorage (set during signin)
function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

// Post item to backend
async function postItem(itemData) {
  try {
    const response = await fetch("php/add_item.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });

    const result = await response.json();

    if (result.status === "success") {
      alert("✅ " + result.message);
      window.location.href = "index.html"; // Redirect to homepage
    } else {
      alert("❌ " + result.message);
    }

    return result;
  } catch (error) {
    console.error("Error:", error);
    alert("❌ Connection failed. Please try again.");
    return { status: "error", message: "Network error" };
  }
}

// Handle form submission
function setupPostForm() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop page reload

    // Get form values
    const itemData = {
      user_id: getCurrentUser()?.id || 1, // Fallback for testing
      name: document.querySelector('[name="name"]').value,
      price: parseFloat(document.querySelector('[name="price"]').value),
      description: document.querySelector('[name="description"]').value,
      category: document.querySelector('[name="category"]').value,
      image_url: document.querySelector('[name="image_url"]').value || "",
    };

    // Send to backend
    postItem(itemData);
  });
}

// Run when page loads
document.addEventListener("DOMContentLoaded", setupPostForm);
