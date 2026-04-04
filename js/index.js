// Simple fetch and render
async function loadItems(category = "") {
  const url = category
    ? `php/get_items.php?category=${category}`
    : "php/get_items.php";
  const response = await fetch(url);
  const items = await response.json();

  const container = document.getElementById("items-container");
  container.innerHTML = items
    .map(
      (item) => `
        <div class="item-card">
            <img src="${item.image_url}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p class="price">$${parseFloat(item.price).toFixed(2)}</p>
            <p class="seller">by ${item.username}</p>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        </div>
    `,
    )
    .join("");
}

// Load on page start
document.addEventListener("DOMContentLoaded", () => loadItems());
