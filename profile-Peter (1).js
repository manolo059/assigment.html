// profile-peter.js — IS 181 JavaScript Assignment | Peter Mugisha

// ─────────────────────────────────────────────
// 1. SKILLS TOGGLE
// Clicking a skill item shows/hides its details
// ─────────────────────────────────────────────
document.querySelectorAll('.skill-item').forEach(function (item) {
  item.addEventListener('click', function () {
    var details = this.querySelector('.skill-details');
    details.classList.toggle('hidden');
  });
});


// ─────────────────────────────────────────────
// 2. EDUCATION TABLE SORT
// Sorts table rows by Year column (ascending ↔ descending toggle)
// ─────────────────────────────────────────────
var sortAscending = true; // tracks current sort direction

document.getElementById('sortBtn').addEventListener('click', function () {
  var table = document.querySelector('table');
  var rows = Array.from(table.querySelectorAll('tr')).slice(1); // skip header row

  rows.sort(function (a, b) {
    var yearA = a.cells[2].textContent.trim();
    var yearB = b.cells[2].textContent.trim();

    // Extract the starting year from strings like "2019-2022" or "2025-Present"
    var numA = parseInt(yearA.split('-')[0]);
    var numB = parseInt(yearB.split('-')[0]);

    return sortAscending ? numA - numB : numB - numA;
  });

  // Remove existing data rows, then re-add in sorted order
  rows.forEach(function (row) {
    table.appendChild(row);
  });

  // Flip direction for next click
  sortAscending = !sortAscending;
  this.textContent = sortAscending ? 'Sort Years' : 'Sort Years ↑';
});


// ─────────────────────────────────────────────
// 3. HOBBIES READ MORE / READ LESS
// Collapses or expands the hobby paragraph on button click
// ─────────────────────────────────────────────
var hobbyText = document.getElementById('hobbyText');
var readBtn = document.getElementById('readBtn');
var isExpanded = false; // tracks whether text is expanded

// Store the full text and create a short version (first two lines)
var fullText = hobbyText.textContent.trim();
var shortText = fullText.split(',').slice(0, 2).join(',') + '...';

// Start collapsed
hobbyText.textContent = shortText;

readBtn.addEventListener('click', function () {
  if (isExpanded) {
    hobbyText.textContent = shortText;
    readBtn.textContent = 'Read More';
  } else {
    hobbyText.textContent = fullText;
    readBtn.textContent = 'Read Less';
  }
  isExpanded = !isExpanded;
});


// ─────────────────────────────────────────────
// 4. IMAGE LIGHTBOX
// Clicking the profile image opens a full-screen overlay
// ─────────────────────────────────────────────
var profileImage = document.getElementById('profileImage');
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var closeBtn = document.getElementById('closeBtn');

// Open lightbox and load the clicked image
profileImage.addEventListener('click', function () {
  lightboxImg.src = this.src;
  lightbox.classList.remove('hidden');
});

// Close lightbox when the × button is clicked
closeBtn.addEventListener('click', function () {
  lightbox.classList.add('hidden');
  lightboxImg.src = '';
});

// Also close lightbox when clicking the dark background outside the image
lightbox.addEventListener('click', function (e) {
  if (e.target === lightbox) {
    lightbox.classList.add('hidden');
    lightboxImg.src = '';
  }
});


// ─────────────────────────────────────────────
// 5. SCROLL-TO-TOP BUTTON
// Button appears after scrolling 200px, smoothly returns to top on click
// ─────────────────────────────────────────────
var topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', function () {
  if (window.scrollY > 200) {
    topBtn.style.display = 'block';
  } else {
    topBtn.style.display = 'none';
  }
});

topBtn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// ─────────────────────────────────────────────
// 6. DARK / LIGHT MODE TOGGLE
// Toggles the .dark-mode class on <body> to switch themes
// ─────────────────────────────────────────────
var themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('td').forEach(tableData => {
    tableData.classList.toggle('dark-mode')
  })

  // Update button label to reflect the current mode
  if (document.body.classList.contains('dark-mode')) {
    themeBtn.textContent = 'Light Mode';
  } else {
    themeBtn.textContent = 'Dark Mode';
  }
});