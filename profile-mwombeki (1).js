// Gather all the clickable skill title elements using querySelectorAll
const skillTriggers = document.querySelectorAll('.skill-trigger');

// Loop through each trigger using a standard forEach loop
skillTriggers.forEach(trigger => {
    // 3. Attach a click event listener to every single category item
    trigger.addEventListener('click', function() {
        // Find the exact details paragraph sitting immediately next to this trigger
        const detailsParagraph = trigger.nextElementSibling;
        
        // Use classList to toggle the 'hidden' class on or off dynamically
        if (detailsParagraph && detailsParagraph.classList.contains('skill-details')) {
            detailsParagraph.classList.toggle('hidden');
        }
    });
});
// --- EDUCATION TABLE SORTING LOGIC ---

// Grab the button, the table body, and all data rows
const sortBtn = document.getElementById('sort-year-btn');
const tableBody = document.querySelector('#education-table tbody');
const rows = Array.from(tableBody.querySelectorAll('tr'));

// Track the sorting direction state (true = ascending, false = descending)
let isAscending = true;

sortBtn.addEventListener('click', function() {
    // Sort the rows array dynamically
    rows.sort((rowA, rowB) => {
        // Year text sits in the 4th column (index 3) of each row
        const yearA = parseInt(rowA.cells[3].innerText);
        const yearB = parseInt(rowB.cells[3].innerText);
        
        // Compare integers based on current sort direction toggle
        return isAscending ? yearA - yearB : yearB - yearA;
    });

    // 4. Re-append the sorted rows back into the DOM table body
    rows.forEach(row => tableBody.appendChild(row));

    // 5. Toggle the direction flag state and update the button arrow icon
    isAscending = !isAscending;
    sortBtn.innerText = isAscending ? '⬆️' : '⬇️';});

// --- HOBBIES READ MORE / READ LESS TOGGLE ---
// Element selectors for the button and the book list
const readMoreBtn = document.getElementById('read-more-btn');
const booksList = document.getElementById('books-list');

// Event listener to monitor clicks
readMoreBtn.addEventListener('click', function() {
    // Toggle the 'hidden' class on the book list
    booksList.classList.toggle('hidden');
    
    // Update the button text depending on whether the list is visible
    if (booksList.classList.contains('hidden')) {
        readMoreBtn.textContent = 'Read More';
    } else {
        readMoreBtn.textContent = 'Read Less';
    }
});

// --- IMAGE LIGHTBOX OVERLAY LOGIC ---
// Target all interactive elements needed
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const triggers = document.querySelectorAll('.lightbox-trigger');

// Loop through each image and assign an activation click listener
triggers.forEach(img => {
    img.addEventListener('click', function() {
        // Feed the source path and alt descriptions directly into the hidden modal structural frame
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        
        // Remove our trusty 'hidden' utility class to display the overlay layout
        lightbox.classList.remove('hidden');
    });
});

// Close the lightbox when clicking the 'X' button
lightboxClose.addEventListener('click', function() {
    lightbox.classList.add('hidden');
});

// Extra UX touch: close the lightbox if the user clicks anywhere on the dark background wrap
lightbox.addEventListener('click', function(event) {
    if (event.target === lightbox) {
        lightbox.classList.add('hidden');
    }
});

// --- SCROLL-TO-TOP BUTTON LOGIC ---

// Selector targeting the navigation anchor
const scrollTopBtn = document.getElementById('scroll-to-top-btn');

// Monitor the window scroll height event
window.addEventListener('scroll', function() {
    // Check if user has scrolled past 200px down the page
    if (window.scrollY > 200) {
        scrollTopBtn.classList.remove('hidden'); // Reveal button
    } else {
        scrollTopBtn.classList.add('hidden'); // Hide button if they scroll back up
    }
});

// Attach standard click event handler to execute smooth viewport shift
scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' /* Tells the browser engine to slide up gracefully rather than teleporting */
    });
});

// --- LIGHT/DARK MODE THEME LOGIC ---

// Selector targeting our theme controller
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// Attach click event handler
themeToggleBtn.addEventListener('click', function() {
    // Toggle the 'light-mode' class directly on the top-level <body> element
    document.body.classList.toggle('light-mode');
    
    // Conditionally swap the text representation state
    if (document.body.classList.contains('light-mode')) {
        themeToggleBtn.innerHTML = '🌒 Dark Mode';
    } else {
        themeToggleBtn.innerHTML = '⚪ Light Mode';
    }
});