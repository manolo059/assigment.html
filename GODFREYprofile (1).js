// Features: Skills toggle, Education sort, Hobbies Read More,
//           Image Lightbox, Scroll-to-top, Dark Mode Toggle
// Wait for HTML to fully load before running
document.addEventListener('DOMContentLoaded', function() {

    // 1. SKILLS TOGGLE
    // Makes each skill item clickable - expands/hides hidden details
    var allLists = document.querySelectorAll('ul');
    var skillsList = null;
    
    // Find the Skills list (the one before Education)
    var headings = document.querySelectorAll('h1');
    for (var i = 0; i < headings.length; i++) {
        if (headings[i].innerText === 'Skills') {
            skillsList = headings[i].nextElementSibling;
            break;
        }
    }
    
    if (skillsList && skillsList.tagName === 'UL') {
        var skillItems = skillsList.querySelectorAll(':scope > li');
        skillItems.forEach(function(item) {
            // Save original text
            var originalText = item.childNodes[0].nodeValue;
            
            // Create details div
            var detailsDiv = document.createElement('div');
            detailsDiv.className = 'skill-details hidden';
            
            // Check if there's a nested list
            var nestedList = item.querySelector('ul');
            if (nestedList) {
                var nestedText = '';
                var nestedItems = nestedList.querySelectorAll('li');
                for (var j = 0; j < nestedItems.length; j++) {
                    nestedText += nestedItems[j].innerText + ', ';
                }
                detailsDiv.innerText = 'Skills: ' + nestedText.slice(0, -2);
                nestedList.style.display = 'none';
            } else {
                detailsDiv.innerText = 'More about ' + originalText.trim();
            }
            
            item.appendChild(detailsDiv);
            item.style.cursor = 'pointer';
            
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                var details = this.querySelector('.skill-details');
                if (details.classList.contains('hidden')) {
                    details.classList.remove('hidden');
                } else {
                    details.classList.add('hidden');
                }
            });
        });
    }

    // 2. EDUCATION TABLE SORT
    // Sorts table rows by Year column
    var educationTable = document.querySelector('table');
    if (educationTable) {
        // Create sort button
        var sortBtn = document.createElement('button');
        sortBtn.innerHTML = 'Sort by Year ▼';
        sortBtn.style.margin = '10px auto';
        sortBtn.style.display = 'block';
        sortBtn.style.padding = '8px 16px';
        sortBtn.style.backgroundColor = 'blue';
        sortBtn.style.color = 'white';
        sortBtn.style.border = 'none';
        sortBtn.style.borderRadius = '5px';
        sortBtn.style.cursor = 'pointer';
        
        // Find Education heading and insert button after it
        for (var k = 0; k < headings.length; k++) {
            if (headings[k].innerText === 'Education') {
                headings[k].insertAdjacentElement('afterend', sortBtn);
                break;
            }
        }
        
        var sortAscending = true;
        
        function sortTable() {
            var tbody = educationTable.querySelector('tbody');
            if (!tbody) {
                tbody = educationTable;
            }
            var rows = Array.from(tbody.querySelectorAll('tr'));
            // Skip header row if it's there
            var startIndex = 0;
            if (rows[0] && rows[0].querySelector('th')) {
                startIndex = 1;
            }
            
            var dataRows = rows.slice(startIndex);
            dataRows.sort(function(rowA, rowB) {
                var yearA = rowA.cells[2].innerText;
                var yearB = rowB.cells[2].innerText;
                var numA = parseInt(yearA);
                var numB = parseInt(yearB);
                if (isNaN(numA)) numA = 0;
                if (isNaN(numB)) numB = 0;
                return sortAscending ? numA - numB : numB - numA;
            });
            
            // Reorder rows
            dataRows.forEach(function(row) {
                tbody.appendChild(row);
            });
        }
        
        sortBtn.addEventListener('click', function() {
            sortAscending = !sortAscending;
            sortBtn.innerHTML = sortAscending ? 'Sort by Year ▼' : 'Sort by Year ▲';
            sortTable();
        });
    }

    // 3. HOBBIES READ MORE / READ LESS
    // Toggle for long hobby descriptions
    var hobbiesList = null;
    for (var m = 0; m < headings.length; m++) {
        if (headings[m].innerText === 'Hobbies & Interests') {
            hobbiesList = headings[m].nextElementSibling;
            break;
        }
    }
    
    if (hobbiesList && hobbiesList.tagName === 'UL') {
        var hobbyItems = hobbiesList.querySelectorAll('li');
        hobbyItems.forEach(function(item) {
            var fullText = item.innerText;
            var words = fullText.split(' ');
            var shortText = words.slice(0, 8).join(' ') + (words.length > 8 ? '...' : '');
            var isExpanded = false;
            
            // Store full text and set short text
            item.setAttribute('data-fulltext', fullText);
            item.firstChild.nodeValue = shortText;
            
            // Create Read More button
            var readBtn = document.createElement('button');
            readBtn.innerHTML = 'Read More';
            readBtn.style.marginLeft = '10px';
            readBtn.style.padding = '4px 8px';
            readBtn.style.fontSize = '12px';
            readBtn.style.cursor = 'pointer';
            readBtn.style.backgroundColor = 'lightblue';
            readBtn.style.border = 'none';
            readBtn.style.borderRadius = '5px';
            
            item.appendChild(readBtn);
            
            readBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                var parentLi = this.parentNode;
                if (isExpanded) {
                    parentLi.firstChild.nodeValue = shortText;
                    this.innerHTML = 'Read More';
                } else {
                    parentLi.firstChild.nodeValue = parentLi.getAttribute('data-fulltext');
                    this.innerHTML = 'Read Less';
                }
                isExpanded = !isExpanded;
            });
        });
    }

    // 4. IMAGE LIGHTBOX
    // Creates popup overlay for profile image
    var profileImg = document.querySelector('img');
    if (profileImg) {
        // Create lightbox elements
        var lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.9);display:none;justify-content:center;align-items:center;z-index:1000;';
        
        var lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = 'max-width:90%;max-height:90%;border-radius:10px;';
        
        var closeBtn = document.createElement('span');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = 'position:absolute;top:20px;right:40px;font-size:50px;color:white;cursor:pointer;font-family:Arial;';
        
        lightbox.appendChild(closeBtn);
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        profileImg.style.cursor = 'pointer';
        profileImg.addEventListener('click', function() {
            lightbox.style.display = 'flex';
            lightboxImg.src = this.src;
        });
        
        closeBtn.addEventListener('click', function() {
            lightbox.style.display = 'none';
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

    // 5. SCROLL TO TOP BUTTON
    // Button appears after scrolling 200px
    var scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑ Top';
    scrollBtn.style.cssText = 'position:fixed;bottom:30px;right:30px;padding:12px 18px;background-color:blue;color:white;border:none;border-radius:50%;cursor:pointer;display:none;z-index:999;';
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 200) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. DARK/LIGHT MODE TOGGLE
    // Toggle button for dark/light theme
    var darkBtn = document.createElement('button');
    darkBtn.innerHTML = '🌙 Dark Mode';
    darkBtn.style.cssText = 'position:fixed;top:10px;right:10px;padding:8px 16px;background-color:#333;color:white;border:none;border-radius:5px;cursor:pointer;z-index:1001;';
    document.body.appendChild(darkBtn);
    
    // Add dark mode styles
    var darkStyles = document.createElement('style');
    darkStyles.textContent = `
        body.dark-mode {
            background: linear-gradient(to left, #1a1a2e, #16213e) !important;
            color: #eee !important;
        }
        body.dark-mode h1 {
            background-color: #0f3460 !important;
            color: white !important;
        }
        body.dark-mode h2 {
            color: #4a9eff !important;
        }
        body.dark-mode ul {
            background-color: #1a1a2e !important;
            color: #eee !important;
        }
        body.dark-mode table {
            background-color: #16213e !important;
            color: #eee !important;
        }
        body.dark-mode th {
            background-color: #0f3460 !important;
        }
        body.dark-mode td {
            border-color: #4a9eff !important;
        }
        body.dark-mode a {
            color: #4a9eff !important;
        }
        body.dark-mode .skill-details {
            background-color: #0f3460 !important;
            color: #ddd !important;
            border-left: 3px solid #4a9eff !important;
        }
    `;
    document.head.appendChild(darkStyles);
    
    darkBtn.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            darkBtn.innerHTML = '☀️ Light Mode';
            darkBtn.style.backgroundColor = '#555';
        } else {
            darkBtn.innerHTML = '🌙 Dark Mode';
            darkBtn.style.backgroundColor = '#333';
        }
    });
 // Add CSS for hidden class
    var styleSheet = document.createElement('style');
    styleSheet.textContent = '.skill-details { margin-top: 8px; padding: 8px; background: #f0f0f0; border-radius: 5px; font-size: 14px; } .hidden { display: none; }';
    document.head.appendChild(styleSheet);
   
    
    
});