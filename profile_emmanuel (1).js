// profile_emmanuel.js
// Author: Emmanuel Benard (Reg: 2025-04-11304)
// IS 181 – JavaScript Group Assignment | May 2026
// Description: All interactive features for profile_emmanuel.html
// Rules followed:
//   - External .js file only (no inline JS, no <script> in body)
//   - Pure Vanilla JavaScript – no frameworks or CDNs
//   - defer attribute used on the <script> tag in HTML
//   - Every function has a one-line comment explaining its purpose

// 1. DOM CONTENT LOADED – Entry point
//    Method: addEventListener on document
//    Fires after HTML is fully parsed (works with defer too)

document.addEventListener("DOMContentLoaded", function () {
  initGreeting();
  initDarkMode();
  initSkillFilter();
  initReadMore();
  initClock();
  initScrollToTop();
  initImageZoom();
  initQuoteRotator();
});

// 2. DYNAMIC GREETING
//    Method: Date object + innerHTML
//    Changes the welcome message based on the time of day

function initGreeting() {
  // Get the current hour (0–23) from the user's local clock
  var hour = new Date().getHours();
  var greeting;

  // Decide greeting text based on hour range
  if (hour >= 5 && hour < 12) {
    greeting = "Good morning";
  } else if (hour >= 12 && hour < 17) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  // Find the greeting element and inject the message
  var greetEl = document.getElementById("greeting-box");
  if (greetEl) {
    greetEl.innerHTML = greeting + ", welcome to my profile! 👋";
  }
}

// 3. DARK MODE TOGGLE
//    Method: classList.toggle on <body> + localStorage
//    Saves the user's preference so it persists on page reload

function initDarkMode() {
  var btn = document.getElementById("dark-mode-btn");

  // Restore saved preference from localStorage on load
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    if (btn) btn.textContent = "☀️ Light Mode";
  }

  // Add click listener to the toggle button
  if (btn) {
    btn.addEventListener("click", function () {
      // toggle() adds the class if absent, removes it if present
      document.body.classList.toggle("dark-mode");

      // Check current state and update button label + storage
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        btn.textContent = "☀️ Light Mode";
      } else {
        localStorage.setItem("darkMode", "disabled");
        btn.textContent = "🌙 Dark Mode";
      }
    });
  }
}

// 4. SKILL FILTER (Show/Hide skill categories)
function initSkillFilter() {
  // Select all filter buttons in the skills section
  var filterBtns = document.querySelectorAll(".skill-filter-btn");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Read which category this button targets (data-category attribute)
      var target = btn.getAttribute("data-category");

      // Select all skill category list items
      var allCategories = document.querySelectorAll(".skill-category");

      allCategories.forEach(function (cat) {
        if (target === "all" || cat.getAttribute("data-category") === target) {
          // Show matching category
          cat.style.display = "list-item";
        } else {
          // Hide non-matching categories
          cat.style.display = "none";
        }
      });

      // Highlight the active button using a CSS class
      filterBtns.forEach(function (b) { b.classList.remove("active-filter"); });
      btn.classList.add("active-filter");
    });
  });
}

// 5. READ MORE / READ LESS FOR BIOGRAPHY
//    Method: getElementById + textContent toggle + a flag variable
//    Collapses the biography to one paragraph, expands on click

function initReadMore() {
  var readBtn = document.getElementById("read-more-btn");
  var extraParagraphs = document.querySelectorAll(".bio-extra");

  // Track whether the text is expanded or collapsed
  var expanded = false;

  if (readBtn) {
    readBtn.addEventListener("click", function () {
      expanded = !expanded; // flip the flag

      extraParagraphs.forEach(function (p) {
        // Show or hide each extra paragraph
        p.style.display = expanded ? "block" : "none";
      });

      // Update the button text to match the current state
      readBtn.textContent = expanded ? "Read Less ▲" : "Read More ▼";
    });
  }
}

// 6. SORT EDUCATION TABLE BY YEAR
//    Method: querySelector + Array.from + sort + innerHTML
//    Sorts the education entries by year when the button is clicked
  const sortBtn = document.getElementById("sort-year-btn");
  const tableBody = document.querySelector("#education-table tbody");
  let ascendingTrackOrder = true; // Track current sort order

  if (sortBtn && tableBody) {
    sortBtn.addEventListener("click", (event) => {
      // Stop the click from bubbling up to the header row
      event.stopPropagation();

      // Get all rows from the table body and convert to an array
      const rows = Array.from(tableBody.querySelectorAll("tr"));

      // Sort rows based on the Year column (3rd column, index 2)
      rowsArray.sort((rowA, rowB) => {
        const embeddedValueA = parseInt(rowA.getAttribute('data-year'), 10);
        const embeddedValueB = parseInt(rowB.getAttribute('data-year'), 10);

        return ascendingTrackOrder ? (embeddedValueA - embeddedValueB) : (embeddedValueB - embeddedValueA);
      });

      // Re-append rows in new order
      rowsArray.forEach((row) => tableBody.appendChild(row));
      
      // Toggle the sort order for the next click
      ascendingTrackOrder = !ascendingTrackOrder;

      // Optionally, update the button text to indicate current sort order
      sortBtn.innerHTML = ascendingTrackOrder ? '🔽' : '🔼';
    });
  }

// 6. LIVE CLOCK
//    Method: setInterval + Date object + textContent
//    Updates a clock element every second using a timer

function initClock() {
  var clockEl = document.getElementById("live-clock");

  // Run updateClock immediately, then repeat every 1000ms (1 second)
  function updateClock() {
    var now = new Date();

    // padStart ensures two-digit formatting e.g. "07" not "7"
    var hh = String(now.getHours()).padStart(2, "0");
    var mm = String(now.getMinutes()).padStart(2, "0");
    var ss = String(now.getSeconds()).padStart(2, "0");

    if (clockEl) {
      clockEl.textContent = "🕐 Local Time: " + hh + ":" + mm + ":" + ss;
    }
  }

  updateClock();                    // call once immediately
  setInterval(updateClock, 1000);  // then every 1 second
}

// 7. SCROLL TO TOP BUTTON
//    Method: window.scrollY + window.scrollTo + scroll event
//    Shows a floating button when the user scrolls down 200px

function initScrollToTop() {
  var scrollBtn = document.getElementById("scroll-top-btn");

  // Listen for scroll events on the window object
  window.addEventListener("scroll", function () {
    // scrollY is how many pixels the page has been scrolled vertically
    if (window.scrollY > 200) {
      scrollBtn.style.display = "block";
    } else {
      scrollBtn.style.display = "none";
    }
  });

  // On button click, smoothly scroll back to the top
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// 8. IMAGE ZOOM ON CLICK (Gallery)
//    Method: querySelectorAll + click event + createElement + overlay
//    Clicking a gallery image shows it enlarged in an overlay

function initImageZoom() {
  var galleryImages = document.querySelectorAll(".gallery-img");

  galleryImages.forEach(function (img) {
    img.addEventListener("click", function () {
      // Create a full-screen overlay div dynamically
      var overlay = document.createElement("div");
      overlay.id = "img-overlay";
      overlay.style.cssText = [
        "position:fixed", "top:0", "left:0",
        "width:100%", "height:100%",
        "background:rgba(0,0,0,0.85)",
        "display:flex", "align-items:center",
        "justify-content:center", "z-index:9999",
        "cursor:pointer"
      ].join(";");

      // Create a large version of the clicked image
      var bigImg = document.createElement("img");
      bigImg.src = img.src;
      bigImg.alt = img.alt;
      bigImg.style.cssText = "max-width:80%;max-height:80%;border-radius:8px;";

      // Append image to overlay, overlay to body
      overlay.appendChild(bigImg);
      document.body.appendChild(overlay);

      // Clicking the overlay removes it (closes zoom)
      overlay.addEventListener("click", function () {
        document.body.removeChild(overlay);
      });
    });

    // Change cursor to pointer to hint the image is clickable
    img.style.cursor = "zoom-in";
  });
}

// 9. MOTIVATIONAL QUOTE ROTATOR
//    Method: Array + Math.random + setInterval + innerHTML
//    Cycles through an array of quotes every 5 seconds

function initQuoteRotator() {
  // Array of motivational quotes
  var quotes = [
    "\"The secret of getting ahead is getting started.\" – Mark Twain",
    "\"Code is like humor. When you have to explain it, it's bad.\" – Cory House",
    "\"Every expert was once a beginner.\" – Helen Hayes",
    "\"In the middle of every difficulty lies opportunity.\" – Albert Einstein",
    "\"Africa is not just the future — it is now.\" – Emmanuel Benard"
  ];

  var quoteEl = document.getElementById("quote-display");
  var index = 0; // tracks the current quote index

  // Helper function to display the quote at the current index
  function showQuote() {
    if (quoteEl) {
      quoteEl.innerHTML = quotes[index];
      // Move to the next quote; wrap around using modulo
      index = (index + 1) % quotes.length;
    }
  }

  showQuote();                      // show first quote immediately
  setInterval(showQuote, 5000);    // rotate every 5 seconds
}
