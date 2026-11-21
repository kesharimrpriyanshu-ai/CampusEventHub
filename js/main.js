/* =========================================================
   Campus Event Hub - Shared Navigation, Footer & Contact Form
   Demonstrates: DOM selection, Event Listeners, Validation
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  // 1. Mobile Responsive Navigation Toggle
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 2. Dynamic Footer Year
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 3. Contact Page Form Validation (runs only on contact.html)
  const contactForm = document.getElementById("contact-form");
  const contactSuccess = document.getElementById("contact-success");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      contactSuccess.classList.add("hidden");

      const nameInput = document.getElementById("contactName");
      const emailInput = document.getElementById("contactEmail");
      const messageInput = document.getElementById("contactMessage");

      const nameError = document.getElementById("error-contactName");
      const emailError = document.getElementById("error-contactEmail");
      const messageError = document.getElementById("error-contactMessage");

      // Clear previous errors
      [nameInput, emailInput, messageInput].forEach(function (el) {
        el.classList.remove("input-error");
      });
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const messageVal = messageInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      if (nameVal.length < 2) {
        nameInput.classList.add("input-error");
        nameError.textContent = "Please enter your name.";
        isValid = false;
      }

      if (!emailPattern.test(emailVal)) {
        emailInput.classList.add("input-error");
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (messageVal.length < 10) {
        messageInput.classList.add("input-error");
        messageError.textContent = "Please enter a message of at least 10 characters.";
        isValid = false;
      }

      if (isValid) {
        contactSuccess.classList.remove("hidden");
        contactForm.reset();
      }
    });
  }
});