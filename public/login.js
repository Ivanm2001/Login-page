document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = e.target.elements.email.value; // Access the value of the email input
  const password = e.target.elements.password.value; // Access the value of the password input

  const res = await fetch("http://localhost:3000/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });
  if (res.ok) {
    const resJson = await res.json();
    if (resJson.redirect) {
      window.location.href = resJson.redirect;
    }
  } else {
    const errorText = await res.json();
    document.getElementById("error-message").textContent = errorText.message;
    console.error("Error response:", errorText);
  }
});
