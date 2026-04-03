document.querySelector("#signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  const data = {
    username: form.username.value,
    email: form.email.value,
    password: form.password.value,
  };

  await fatch("php/signup.php", {
    method: "POST",
    Headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  alert("Sign up successful");
});
