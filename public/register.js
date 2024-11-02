document
  .getElementById("register-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.elements.email.value; // Access the value of the email input
    const password = e.target.elements.password.value; // Access the value of the password input
    const repeat_password = e.target.elements.repeat_password.value;

    console.log(email);
    console.log(password);

    const res = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        repeat_password: repeat_password,
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
