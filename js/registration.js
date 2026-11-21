/* =========================================================
   Campus Event Hub - Registration Validation & localStorage
   Demonstrates: Form validation, Regex, JSON, localStorage
   ========================================================= */

const STORAGE_KEY = "campusEventHubRegistrations";

// Helper function to safely escape text before inserting into HTML
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// 1. Populate "Select Event" dropdown using eventsData from js/events.js
function populateEventDropdown() {
  const eventSelect = document.getElementById("eventSelect");
  if (!eventSelect || typeof eventsData === "undefined") return;

  eventsData.forEach(function (event) {
    const option = document.createElement("option");
    option.value = event.title;
    option.textContent = event.title + " (" + event.displayDate + ")";
    eventSelect.appendChild(option);
  });

  // Pre-select event if user arrived from event-details.html?event=...
  const params = new URLSearchParams(window.location.search);
  const preselectedEvent = params.get("event");
  if (preselectedEvent) {
    eventSelect.value = preselectedEvent;
  }
}

// 2. Read saved registrations array from browser localStorage
function getSavedRegistrations() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (!storedData) return [];

  try {
    return JSON.parse(storedData);
  } catch (error) {
    return [];
  }
}

// 3. Render the "My Registrations" summary panel
function renderSavedRegistrations() {
  const listContainer = document.getElementById("saved-registrations-list");
  const clearBtn = document.getElementById("clear-registrations-btn");
  if (!listContainer) return;

  const registrations = getSavedRegistrations();

  if (registrations.length === 0) {
    clearBtn.classList.add("hidden");
    listContainer.innerHTML =
      '<p class="footer-note">No saved registrations yet. Submit the form to see your demo registration summary here.</p>';
    return;
  }

  clearBtn.classList.remove("hidden");

  // Show newest registration first
  const reversedList = registrations.slice().reverse();

  listContainer.innerHTML = reversedList
    .map(function (reg) {
      return `
        <div class="saved-item">
          <h3>${escapeHTML(reg.eventName)}</h3>
          <p><strong>Student:</strong> ${escapeHTML(reg.fullName)} (${escapeHTML(reg.enrollment)})</p>
          <p><strong>Class:</strong> ${escapeHTML(reg.year)} &bull; Section ${escapeHTML(reg.section)}</p>
          <p><strong>Email:</strong> ${escapeHTML(reg.email)}</p>
          <p><strong>Phone:</strong> ${escapeHTML(reg.phone)}</p>
          <p class="saved-time">Saved on: ${escapeHTML(reg.submittedAt)}</p>
        </div>
      `;
    })
    .join("");
}

// 4. Helper functions for showing and clearing form errors
function showFieldError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorEl = document.getElementById("error-" + fieldId);
  if (field && field.type !== "checkbox") {
    field.classList.add("input-error");
  }
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function clearAllErrors() {
  const fieldIds = [
    "fullName",
    "email",
    "phone",
    "enrollment",
    "eventSelect",
    "year",
    "section",
    "terms"
  ];

  fieldIds.forEach(function (id) {
    const field = document.getElementById(id);
    const errorEl = document.getElementById("error-" + id);
    if (field) field.classList.remove("input-error");
    if (errorEl) errorEl.textContent = "";
  });
}

// 5. Initialize Registration Form Validation & Submit Handling
function initRegistrationForm() {
  const form = document.getElementById("registration-form");
  const successBox = document.getElementById("form-success");
  const clearBtn = document.getElementById("clear-registrations-btn");
  if (!form) return;

  populateEventDropdown();
  renderSavedRegistrations();

  form.addEventListener("submit", function (event) {
    // Prevent default browser page reload
    event.preventDefault();

    clearAllErrors();
    successBox.classList.add("hidden");

    // Read trimmed form values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const enrollment = document.getElementById("enrollment").value.trim();
    const eventName = document.getElementById("eventSelect").value;
    const year = document.getElementById("year").value;
    const section = document.getElementById("section").value.trim();
    const termsChecked = document.getElementById("terms").checked;

    let isValid = true;

    // Validate Full Name
    if (fullName.length < 3) {
      showFieldError("fullName", "Please enter your full name (at least 3 characters).");
      isValid = false;
    }

    // Validate Email format using basic regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showFieldError("email", "Please enter a valid student email address.");
      isValid = false;
    }

    // Validate Phone Number (exactly 10 digits)
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
      showFieldError("phone", "Please enter a valid 10-digit phone number.");
      isValid = false;
    }

    // Validate Enrollment Number
    if (enrollment.length < 4) {
      showFieldError("enrollment", "Please enter a valid enrollment number.");
      isValid = false;
    }

    // Validate Event Selection
    if (eventName === "") {
      showFieldError("eventSelect", "Please select an event to register for.");
      isValid = false;
    }

    // Validate Year
    if (year === "") {
      showFieldError("year", "Please select your academic year.");
      isValid = false;
    }

    // Validate Section
    if (section === "") {
      showFieldError("section", "Please enter your class section (e.g., CSE-A).");
      isValid = false;
    }

    // Validate Checkbox Confirmation
    if (!termsChecked) {
      showFieldError("terms", "You must confirm the checkbox before submitting.");
      isValid = false;
    }

    // Stop if any validation failed
    if (!isValid) {
      return;
    }

    // Create registration object
    const newRegistration = {
      fullName: fullName,
      email: email,
      phone: phone,
      enrollment: enrollment,
      eventName: eventName,
      year: year,
      section: section,
      submittedAt: new Date().toLocaleString()
    };

    // Save updated list into browser localStorage
    const existingRegistrations = getSavedRegistrations();
    existingRegistrations.push(newRegistration);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingRegistrations));

    // Show success message, reset form, and refresh summary section
    successBox.classList.remove("hidden");
    form.reset();
    renderSavedRegistrations();
  });

  // Allow user to clear saved demo registrations
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      localStorage.removeItem(STORAGE_KEY);
      renderSavedRegistrations();
    });
  }
}

document.addEventListener("DOMContentLoaded", initRegistrationForm);