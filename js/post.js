fetch("php/check_auth.php")
  .then((res) => res.json())
  .then((data) => {
    if (!data.loggedIn) {
      alert("You must be logged in to access this page");
      window.location.href = "signin.html";
    }
  });

const form = document.querySelector("#post-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.name.value,
    price: form.price.value,
    description: form.description.value,
  };

  const res = await fetch("php/add_item.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (result.error) {
    alert(result.error);
  } else {
    alert("Item posted successfully");
    form.reset();
  }
});
