document.addEventListener("DOMContentLoaded", function () {
  const titleEl = document.getElementById("itemTitle");
  const priceEl = document.getElementById("itemPrice");
  const descEl = document.getElementById("itemDescription");
  const imageEl = document.querySelector(".item-image");
  const sellerEl = document.getElementById("sellerName");
  const sellerTelegramEl = document.getElementById("sellerTelegram");
  const contactSellerBtn = document.getElementById("contactSellerBtn");
  const commentForm = document.getElementById("commentForm");
  const commentText = document.getElementById("commentText");
  const commentsList = document.getElementById("commentsList");

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    if (titleEl) titleEl.textContent = "Item not found";
    if (descEl) descEl.textContent = "Missing item id.";
    return;
  }

  const commentsKey = `comments_item_${id}`;

  function readComments() {
    try {
      const raw = localStorage.getItem(commentsKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function writeComments(comments) {
    localStorage.setItem(commentsKey, JSON.stringify(comments || []));
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function renderComments() {
    if (!commentsList) return;

    const comments = readComments();
    if (comments.length === 0) {
      commentsList.innerHTML = "<p>No comments yet.</p>";
      return;
    }

    commentsList.innerHTML = comments
      .slice()
      .reverse()
      .map((c) => {
        const name = escapeHtml(c.username || "User");
        const text = escapeHtml(c.text || "");
        return `<div class="review"><h4>${name}</h4><p>${text}</p></div>`;
      })
      .join("");
  }

  renderComments();

  if (commentForm) {
    commentForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (typeof checkAuth !== "function") {
        alert("Please sign in first.");
        window.location.href = "signin.html";
        return;
      }

      const auth = await checkAuth();
      if (!auth.loggedin) {
        alert("Please sign in to comment.");
        window.location.href = "signin.html";
        return;
      }

      const text = (commentText && commentText.value ? commentText.value : "").trim();
      if (!text) return;

      const savedUser = localStorage.getItem("user");
      const user = savedUser ? JSON.parse(savedUser) : {};
      const username = auth.username || user.username || "User";

      const comments = readComments();
      comments.push({ username, text, ts: Date.now() });
      writeComments(comments);

      if (commentText) commentText.value = "";
      renderComments();
    });
  }

  fetch(`/MarketPlace/php/get_item.php?id=${encodeURIComponent(id)}`)
    .then((response) => response.json())
    .then((item) => {
      if (!item || item.status === "error") {
        if (titleEl) titleEl.textContent = "Item not found";
        if (descEl) descEl.textContent = (item && item.message) || "Could not load item.";
        return;
      }

      if (titleEl) titleEl.textContent = item.name || "Item";

      if (sellerEl) sellerEl.textContent = item.username || "Seller";

      const telegramUsername = (item.telegram_username || "").trim();
      if (sellerTelegramEl) {
        if (telegramUsername) {
          sellerTelegramEl.style.display = "block";
          sellerTelegramEl.textContent = `Telegram: @${telegramUsername.replace(/^@/, "")}`;
        } else {
          sellerTelegramEl.style.display = "none";
          sellerTelegramEl.textContent = "";
        }
      }

      if (contactSellerBtn) {
        contactSellerBtn.onclick = function () {
          if (!telegramUsername) {
            alert("Seller did not add Telegram username.");
            return;
          }
          const clean = telegramUsername.replace(/^@/, "");
          window.open(`https://t.me/${encodeURIComponent(clean)}`, "_blank");
        };
      }

      if (priceEl) {
        const price = parseFloat(item.price || 0);
        priceEl.textContent = `Price: ${price.toLocaleString()} ETB`;
      }

      if (descEl) descEl.textContent = item.description || "";

      if (imageEl) {
        let src = "https://via.placeholder.com/600x400?text=No+Image";
        if (item.image && item.image !== "" && item.image !== null) {
          src = `/MarketPlace/uploads/${item.image}`;
        }
        imageEl.src = src;
        imageEl.onerror = function () {
          this.onerror = null;
          this.src = "https://via.placeholder.com/600x400?text=Image+Failed";
        };
      }
    })
    .catch(() => {
      if (titleEl) titleEl.textContent = "Failed to load";
      if (descEl) descEl.textContent = "Connection error. Make sure XAMPP is running.";
    });
});