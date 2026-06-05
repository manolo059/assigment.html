/**
 * Form Validation Script
 * ----------------------
 * This script validates a contact/registration form before submission.
 * It checks that all required fields are filled in correctly and shows
 * error messages next to any fields that fail validation.
 */

// Wait until the entire HTML page has fully loaded before running the script.
// This ensures all form elements are available in the DOM.
document.addEventListener("DOMContentLoaded", () => {

  // Select the <form> element on the page so we can listen for its submit event.
  const form = document.querySelector("form");

  // Attach a submit event listener to the form.
  // This function runs every time the user tries to submit the form.
  form.addEventListener("submit", function (event) {

    // A flag to track whether all fields are valid.
    // It starts as true and is set to false if any validation check fails.
    let valid = true;

    // Clear all previous error messages before re-validating.
    // This removes any leftover errors from a previous failed submission attempt.
    document.querySelectorAll(".error").forEach(el => el.textContent = "");


    // ── NAME VALIDATION ──────────────────────────────────────────────────────
    // Get the value from the "name" input field and remove leading/trailing spaces.
    const name = document.getElementById("name").value.trim();

    // Check if the name field is empty.
    if (name === "") {
      // Display an error message in the element with id "nameError".
      document.getElementById("nameError").textContent = "Full name is required.";
      valid = false; // Mark the form as invalid.
    }


    // ── EMAIL VALIDATION ─────────────────────────────────────────────────────
    // Get the value from the "email" input field and remove leading/trailing spaces.
    const email = document.getElementById("email").value.trim();

    // A regular expression (regex) pattern to check for a valid email format.
    // It ensures the email has characters before "@", a domain name, and a "." extension.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      // Show an error if the email field is completely empty.
      document.getElementById("emailError").textContent = "Email is required.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      // Show an error if the email doesn't match the valid email pattern.
      document.getElementById("emailError").textContent = "Enter a valid email address.";
      valid = false;
    }


    // ── GENDER VALIDATION ────────────────────────────────────────────────────
    // Check if any radio button in the "gender" group has been selected.
    // querySelector returns null if no radio button is checked.
    const genderSelected = document.querySelector('input[name="gender"]:checked');

    if (!genderSelected) {
      // Show an error if no gender option has been chosen.
      document.getElementById("genderError").textContent = "Please select your gender.";
      valid = false;
    }


    // ── INTERESTS VALIDATION ─────────────────────────────────────────────────
    // Get all checked checkboxes in the "interest" group.
    // querySelectorAll returns a list; if it's empty, no interests were selected.
    const interests = document.querySelectorAll('input[name="interest"]:checked');

    if (interests.length === 0) {
      // Show an error if the user hasn't selected at least one interest.
      document.getElementById("interestError").textContent = "Select at least one interest.";
      valid = false;
    }


    // ── MESSAGE VALIDATION ───────────────────────────────────────────────────
    // Get the value from the "message" textarea and remove leading/trailing spaces.
    const message = document.getElementById("message").value.trim();

    if (message === "") {
      // Show an error if the message field is empty.
      document.getElementById("messageError").textContent = "Message cannot be empty.";
      valid = false;
    }


    // ── FINAL CHECK ──────────────────────────────────────────────────────────
    // If any validation check failed (valid === false), stop the form from submitting.
    // event.preventDefault() cancels the default form submission so the user can fix errors.
    if (!valid) {
      event.preventDefault();
    }

    // If all validations passed (valid === true), the form submits normally.
  });
});
