/* =========================================================
   Campus Event Hub - Event Data, Rendering, Search & Details
   Demonstrates: Arrays, Objects, Functions, DOM, Array.filter()
   ========================================================= */

// 1. Sample Campus Events Dataset (Array of Objects)
const eventsData = [
  {
    id: 1,
    title: "Coding Hackathon",
    category: "Technical",
    date: "2026-12-05",
    displayDate: "Dec 05, 2026",
    time: "9:00 AM - 6:00 PM",
    venue: "Innovation Lab, Block A",
    organizer: "CSE Coding Club",
    image: "assets/images/hackathon.svg",
    shortDescription: "Build practical software solutions in teams during a 9-hour campus coding sprint.",
    description:
      "Put your problem-solving and programming skills to the test in our annual campus hackathon. Teams of 2 to 4 students will choose from real-world campus and community problem statements, build a working prototype, and pitch it to faculty mentors.",
    eligibility: "Open to all undergraduate students (1st to 4th year). Bring your own laptop."
  },
  {
    id: 2,
    title: "AI Workshop",
    category: "Workshop",
    date: "2026-12-08",
    displayDate: "Dec 08, 2026",
    time: "2:00 PM - 5:00 PM",
    venue: "Seminar Hall 2, CS Block",
    organizer: "AI & Data Science Society",
    image: "assets/images/ai-workshop.svg",
    shortDescription: "Beginner-friendly hands-on session introducing Machine Learning and prompt engineering.",
    description:
      "Curious about how Artificial Intelligence works under the hood? This guided workshop covers foundational machine learning concepts, simple Python demonstrations, and ethical AI usage for students starting their tech journey.",
    eligibility: "Open to all students. No prior AI or advanced math experience required."
  },
  {
    id: 3,
    title: "Cultural Fest",
    category: "Cultural",
    date: "2026-12-12",
    displayDate: "Dec 12, 2026",
    time: "11:00 AM - 8:00 PM",
    venue: "Main Campus Auditorium & Lawn",
    organizer: "Student Cultural Council",
    image: "assets/images/cultural-fest.svg",
    shortDescription: "Celebrate student talent with dance, drama, fashion showcase, and food stalls.",
    description:
      "Our flagship campus celebration brings together dance troupes, theatre clubs, art exhibitors, and student food stalls for an energetic day of creativity and community spirit.",
    eligibility: "Open to all college students with a valid student ID card."
  },
  {
    id: 4,
    title: "Entrepreneurship Talk",
    category: "Seminar",
    date: "2026-12-14",
    displayDate: "Dec 14, 2026",
    time: "3:30 PM - 5:30 PM",
    venue: "Auditorium Hall B",
    organizer: "Campus E-Cell",
    image: "assets/images/entrepreneurship.svg",
    shortDescription: "Interactive fireside chat with alumni startup founders on turning ideas into products.",
    description:
      "Learn how student startups validate ideas, build first prototypes on a tight budget, and overcome early failures. Includes an open Q&A session with two alumni founders.",
    eligibility: "Open to all branches and years interested in startups or product building."
  },
  {
    id: 5,
    title: "Sports Meet",
    category: "Sports",
    date: "2026-12-17",
    displayDate: "Dec 17, 2026",
    time: "7:30 AM - 4:30 PM",
    venue: "University Sports Ground",
    organizer: "Campus Sports Committee",
    image: "assets/images/sports-meet.svg",
    shortDescription: "Inter-department athletics, badminton, basketball, and relay races.",
    description:
      "Represent your department in track sprints, tug-of-war, relay races, and court matches. Medals and participation certificates will be awarded during the closing ceremony.",
    eligibility: "Open to all enrolled students. Proper sports attire is mandatory."
  },
  {
    id: 6,
    title: "Photography Contest",
    category: "Cultural",
    date: "2026-12-19",
    displayDate: "Dec 19, 2026",
    time: "10:00 AM - 2:00 PM",
    venue: "Campus Courtyard & Gallery",
    organizer: "LensCraft Photography Club",
    image: "assets/images/photography.svg",
    shortDescription: "Capture the theme 'Life on Campus' using either a smartphone or DSLR camera.",
    description:
      "Walk around campus and submit your best unedited photograph matching the day's theme. Shortlisted entries will be displayed in the student gallery and judged on composition and storytelling.",
    eligibility: "Open to all students. Both mobile phones and DSLR cameras are allowed."
  },
  {
    id: 7,
    title: "Tech Seminar",
    category: "Seminar",
    date: "2026-12-21",
    displayDate: "Dec 21, 2026",
    time: "11:00 AM - 1:00 PM",
    venue: "Lecture Theatre 101",
    organizer: "Department of Computer Science",
    image: "assets/images/tech-seminar.svg",
    shortDescription: "Industry expert talk on modern Web Development, Cybersecurity, and Cloud basics.",
    description:
      "Gain practical career insights from senior software engineers discussing how foundational CS concepts translate into modern web applications, secure coding habits, and internship preparation.",
    eligibility: "Recommended for 1st and 2nd year B.Tech students, open to all."
  },
  {
    id: 8,
    title: "Music Night",
    category: "Cultural",
    date: "2026-12-23",
    displayDate: "Dec 23, 2026",
    time: "6:00 PM - 9:30 PM",
    venue: "Open Air Amphitheatre",
    organizer: "Rhythm & Acoustics Club",
    image: "assets/images/music-night.svg",
    shortDescription: "An evening of live student bands, acoustic solos, and unplugged performances.",
    description:
      "Unwind after classes with live indie, classical fusion, and acoustic performances by campus vocalists and bands under the open sky.",
    eligibility: "Open to all students. Performers and audience members can register."
  }
];

// 2. Helper Function: Build HTML markup for a single event card
function createEventCardHTML(event) {
  return `
    <article class="event-card">
      <img src="${event.image}" alt="${event.title}" class="event-card-img">
      <div class="event-card-body">
        <div class="event-card-top">
          <span class="badge">${event.category}</span>
          <span class="event-date">${event.displayDate}</span>
        </div>
        <h3 class="event-title">${event.title}</h3>
        <div class="event-meta">
          <span><strong>Time:</strong> ${event.time}</span>
          <span><strong>Venue:</strong> ${event.venue}</span>
        </div>
        <p class="event-desc">${event.shortDescription}</p>
        <a href="event-details.html?id=${event.id}" class="btn btn-primary btn-block">View Details</a>
      </div>
    </article>
  `;
}

// 3. Render Featured Events on Home Page (index.html)
function renderFeaturedEvents() {
  const featuredContainer = document.getElementById("featured-events");
  if (!featuredContainer) return;

  // Pick the first 3 events using Array.slice()
  const featuredList = eventsData.slice(0, 3);
  featuredContainer.innerHTML = featuredList.map(createEventCardHTML).join("");
}

// 4. Render, Search, Filter & Sort on Events Page (events.html)
function initEventsPage() {
  const eventsGrid = document.getElementById("events-grid");
  if (!eventsGrid) return;

  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");
  const sortSelect = document.getElementById("sort-select");
  const resultsCount = document.getElementById("results-count");
  const noEventsMsg = document.getElementById("no-events-msg");
  const resetBtn = document.getElementById("reset-filters-btn");

  function displayFilteredEvents() {
    // Convert search text to lowercase for case-insensitive matching
    const searchQuery = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    const sortOption = sortSelect.value;

    // Filter events using Array.filter()
    let filteredEvents = eventsData.filter(function (event) {
      const matchesTitle = event.title.toLowerCase().includes(searchQuery);
      const matchesCategory =
        selectedCategory === "all" || event.category === selectedCategory;

      return matchesTitle && matchesCategory;
    });

    // Optional simple sorting using Array.sort()
    if (sortOption === "date-asc") {
      filteredEvents.sort(function (a, b) {
        return a.date.localeCompare(b.date);
      });
    } else if (sortOption === "title-asc") {
      filteredEvents.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    }

    // Update count message
    resultsCount.textContent =
      "Showing " + filteredEvents.length + " of " + eventsData.length + " events";

    // Handle empty results vs matching cards
    if (filteredEvents.length === 0) {
      eventsGrid.innerHTML = "";
      noEventsMsg.classList.remove("hidden");
    } else {
      noEventsMsg.classList.add("hidden");
      eventsGrid.innerHTML = filteredEvents.map(createEventCardHTML).join("");
    }
  }

  // Event listeners for live search, category filter, and sort
  searchInput.addEventListener("input", displayFilteredEvents);
  categoryFilter.addEventListener("change", displayFilteredEvents);
  sortSelect.addEventListener("change", displayFilteredEvents);

  // Reset button clears search and filters
  resetBtn.addEventListener("click", function () {
    searchInput.value = "";
    categoryFilter.value = "all";
    sortSelect.value = "default";
    displayFilteredEvents();
  });

  // Initial render when page loads
  displayFilteredEvents();
}

// 5. Render Event Details Page (event-details.html)
function initEventDetailsPage() {
  const detailsContainer = document.getElementById("event-details-container");
  if (!detailsContainer) return;

  // Read ?id= from the browser URL
  const params = new URLSearchParams(window.location.search);
  const idParam = params.get("id");

  // If no ID was provided in URL, default to Event #1 so the page still displays cleanly
  const eventId = idParam ? Number(idParam) : 1;

  // Find the matching event object using Array.find()
  const selectedEvent = eventsData.find(function (event) {
    return event.id === eventId;
  });

  if (!selectedEvent) {
    detailsContainer.innerHTML = `
      <div class="empty-state">
        <h2>Event Not Found</h2>
        <p>The event you are looking for does not exist or may have been removed.</p>
        <a href="events.html" class="btn btn-primary">Browse All Events</a>
      </div>
    `;
    return;
  }

  // Update browser tab title
  document.title = "Campus Event Hub | " + selectedEvent.title;

  // Encode event title in registration link so it auto-selects on registration.html
  const registerUrl =
    "registration.html?event=" + encodeURIComponent(selectedEvent.title);

  detailsContainer.innerHTML = `
    <article class="details-card">
      <img src="${selectedEvent.image}" alt="${selectedEvent.title}" class="details-banner">
      <div class="details-body">
        <span class="badge">${selectedEvent.category}</span>
        <h1>${selectedEvent.title}</h1>

        <div class="details-meta-grid">
          <div class="meta-item">
            <strong>Date</strong>
            <span>${selectedEvent.displayDate}</span>
          </div>
          <div class="meta-item">
            <strong>Time</strong>
            <span>${selectedEvent.time}</span>
          </div>
          <div class="meta-item">
            <strong>Venue</strong>
            <span>${selectedEvent.venue}</span>
          </div>
          <div class="meta-item">
            <strong>Organizer</strong>
            <span>${selectedEvent.organizer}</span>
          </div>
        </div>

        <div class="details-section">
          <h2>About This Event</h2>
          <p>${selectedEvent.description}</p>
        </div>

        <div class="details-section">
          <h2>Eligibility</h2>
          <p>${selectedEvent.eligibility}</p>
        </div>

        <div class="details-actions">
          <a href="${registerUrl}" class="btn btn-primary">Register for This Event</a>
          <a href="events.html" class="btn btn-outline">Explore More Events</a>
        </div>
      </div>
    </article>
  `;
}

// Run appropriate event functions once the DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  renderFeaturedEvents();
  initEventsPage();
  initEventDetailsPage();
});