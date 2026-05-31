document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", function (event) {
    let valid = true;

    // Clear previous errors
    document.querySelectorAll(".error").forEach(el => el.textContent = "");

    // Name validation
    const name = document.getElementById("name").value.trim();
    if (name === "") {
      document.getElementById("nameError").textContent = "Full name is required.";
      valid = false;
    }

    // Email validation
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === "") {
      document.getElementById("emailError").textContent = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      document.getElementById("emailError").textContent = "Enter a valid email address.";
      valid = false;
    }

    // Gender validation
    const genderSelected = document.querySelector('input[name="gender"]:checked');
    if (!genderSelected) {
      document.getElementById("genderError").textContent = "Please select your gender.";
      valid = false;
    }

    // Interests validation
    const interests = document.querySelectorAll('input[name="interest"]:checked');
    if (interests.length === 0) {
      document.getElementById("interestError").textContent = "Select at least one interest.";
      valid = false;
    }

    // Message validation
    const message = document.getElementById("message").value.trim();
    if (message === "") {
      document.getElementById("messageError").textContent = "Message cannot be empty.";
      valid = false;
    }

    // Prevent form submission if invalid
    if (!valid) {
      event.preventDefault();
    }
  });
});
