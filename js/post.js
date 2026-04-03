fetch(php / check_auth.php)
  .then((res) => res.json())
  .then((data) => {
    if (!data.loggedIn) {
      alert("You must be logged in to access this page");
      window.location.href = "signin.html";
    }
  });
