document.addEventListener('DOMContentLoaded', () => {

    
    // Example: Show/hide skill details on click
    const skillCategoryBoxes = document.querySelectorAll('.interactive-skill-trigger');

    skillCategoryBoxes.forEach(box => {
        box.addEventListener('click', (event) => {
            // Prevent child elements or lists from resetting triggers incorrectly
            if (event.target.closest('.persistent-skill-list')) return;

            const hiddenSummary = box.querySelector('.skill-summary-line');
            const toggleIcon = box.querySelector('.toggle-indicator-icon');

            if (hiddenSummary) {
                const isHidden = hiddenSummary.classList.contains('hidden');
                
                if (isHidden) {
                    hiddenSummary.classList.remove('hidden');
                    if (toggleIcon) toggleIcon.style.transform = 'rotate(180deg)';
                } else {
                    hiddenSummary.classList.add('hidden');
                    if (toggleIcon) toggleIcon.style.transform = 'rotate(0deg)';
                }
            }
        });
    });

    // Example: Sort education table by year on header click
    const sortBtn = document.getElementById('sort-education-btn');
    const tableBody = document.querySelector('#edu-table tbody');
    let ascendingTrackOrder = true;

    if (sortBtn && tableBody) {
        sortBtn.addEventListener('click', (event) => {
            // Stop click propagation sequence heading events
            event.stopPropagation();

            const rowsArray = Array.from(tableBody.querySelectorAll('tr'));

            rowsArray.sort((rowA, rowB) => {
                const embeddedValueA = parseInt(rowA.getAttribute('data-year'), 10);
                const embeddedValueB = parseInt(rowB.getAttribute('data-year'), 10);

                return ascendingTrackOrder ? (embeddedValueA - embeddedValueB) : (embeddedValueB - embeddedValueA);
            });

            rowsArray.forEach(row => tableBody.appendChild(row));

            ascendingTrackOrder = !ascendingTrackOrder;

            sortBtn.innerHTML = ascendingTrackOrder ? '⬇️' : '⬆️' ;
        });
    }
    // Example: Toggle visibility of additional hobbies/books list
    const toggleHobbyBtn = document.querySelector('.toggle-hobby-btn');
    const expandableBooksList = document.getElementById('expandable-books-list');

    if (toggleHobbyBtn && expandableBooksList) {
        toggleHobbyBtn.addEventListener('click', () => {
            const isCurrentlyHidden = expandableBooksList.classList.contains('hidden');

            if (isCurrentlyHidden) {
                expandableBooksList.classList.remove('hidden');
                toggleHobbyBtn.textContent = 'Read Less';
            } else {
                expandableBooksList.classList.add('hidden');
                toggleHobbyBtn.textContent = 'Read More';
            }
        });
    }

    // Example: Lightbox modal for image gallery
    const lightboxModal = document.getElementById('portal-lightbox');
    const lightboxImg = document.getElementById('lightbox-display-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const galleryTriggers = document.querySelectorAll('.lightbox-trigger');

    galleryTriggers.forEach(imageNode => {
        imageNode.addEventListener('click', () => {
            if (lightboxModal && lightboxImg && lightboxCaption) {
                lightboxImg.src = imageNode.src;
                lightboxCaption.textContent = imageNode.alt;
                lightboxModal.classList.remove('hidden');
            }
        });
    });

    if (closeBtn && lightboxModal) {
        closeBtn.addEventListener('click', () => {
            lightboxModal.classList.add('hidden');
        });

        lightboxModal.addEventListener('click', (event) => {
            if (event.target === lightboxModal) {
                lightboxModal.classList.add('hidden');
            }
        });
    }

    // Example: Scroll to top button functionality
    const scrollTopBtn = document.getElementById('scroll-top-btn');
    const scrollMainContainer = document.querySelector('.main-content');

    if (scrollTopBtn && scrollMainContainer) {
        scrollMainContainer.addEventListener('scroll', () => {
            if (scrollMainContainer.scrollTop > 200) {
                scrollTopBtn.classList.remove('hidden');
            } else {
                scrollTopBtn.classList.add('hidden');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            scrollMainContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Example: Theme toggle button functionality
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');

            const isDarkActive = document.body.classList.contains('dark-theme');
            themeToggleBtn.innerHTML = isDarkActive ? 
                '🌙 Dark Theme' : 
                '🌞 Light Mode';
        });
    }
});