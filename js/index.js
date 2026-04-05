// js/index.js - Handles items display and search (no code left in HTML)

const items = [
  { title: "Laptop", price: 30000, link: "item.html" },
  { title: "Book", price: 300, link: "item.html" },
  { title: "Tshirt", price: 1000, link: "item.html" },
  { title: "Dress", price: 3000, link: "item.html" },
  { title: "Necklace", price: 3000, link: "item.html" },
  { title: "Samsung Phone", price: 15000, link: "item.html" },
  { title: "Chair", price: 1500, link: "item.html" },
];

function displayItems(filteredItems) {
  const container = document.getElementById("itemsContainer");
  container.innerHTML = "";

  filteredItems.forEach((item) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
            <h3>${item.title}</h3>
            <p>Price: ${item.price} ETB</p>
            <a href="${item.link}" class="detail-btn">View Details</a>
        `;
    container.appendChild(card);
  });
}

function searchItems() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = items.filter((item) =>
    item.title.toLowerCase().includes(term),
  );
  displayItems(filtered.length ? filtered : items);
}

// Load items when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  displayItems(items);
});
