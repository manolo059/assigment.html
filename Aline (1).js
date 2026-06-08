document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================================
    // 1. SKILLS SECTION: Click to toggle existing list/text inside the card
    // =========================================================================
    const skillCards = document.querySelectorAll(".skill-card");
    
    skillCards.forEach(card => {
        const list = card.querySelector("ol, ul");
        card.style.cursor = "pointer";
        
        // Hide list content by default using inline styles to avoid changing your CSS
        if (list) {
            list.style.display = "none";
            list.style.transition = "all 0.3s ease";
        }
        
        card.addEventListener("click", (e) => {
            if (e.target.tagName === 'LI') return; // Prevent misfires on list item clicks
            
            if (list) {
                // Show/hide toggle using classList or basic styling fallback
                if (list.style.display === "none") {
                    list.style.display = "block";
                    card.classList.add("active-skill");P
                } else {
                    list.style.display = "none";
                    card.classList.remove("active-skill");
                }
            } else {
                // Visual toggle if it's a card without a list (e.g. Continuous Learning)
                card.style.backgroundColor = card.style.backgroundColor === "rgba(145, 70, 82, 0.2)" 
                    ? "rgba(53, 26, 26, 0.4)" 
                    : "rgba(145, 70, 82, 0.2)";
            }
        });
    });

    // =========================================================================
    // 2. EDUCATION TABLE: Dynamically add Sort Button and sort rows by Year
    // =========================================================================
    const table = document.querySelector("table");
    if (table) {
        // Dynamically insert the sort button right above the table so you don't edit the HTML
        const sortBtn = document.createElement("button");
        sortBtn.innerHTML = "Sort by Year <i class='fas fa-sort'></i>";
        sortBtn.style.cssText = "background:#C5A059; color:white; border:none; padding:8px 15px; font-family:'Playfair Display', serif; border-radius:5px; cursor:pointer; margin-bottom:10px;";
        table.parentNode.insertBefore(sortBtn, table);
        
        let ascending = true;
        
        sortBtn.addEventListener("click", () => {
            const tbody = table.querySelector("tbody");
            const rows = Array.from(table.querySelectorAll("tbody tr"));
            
            rows.sort((rowA, rowB) => {
                // Looks at the last 4 characters of the Year column string (e.g., "2025-2028" -> "2028")
                const yearA = parseInt(rowA.cells[2].textContent.trim().slice(-4));
                const yearB = parseInt(rowB.cells[2].textContent.trim().slice(-4));
                return ascending ? yearA - yearB : yearB - yearA;
            });
            
            rows.forEach(row => tbody.appendChild(row));
            ascending = !ascending;
            sortBtn.innerHTML = ascending 
                ? "Sort by Year <i class='fas fa-sort-up'></i>" 
                : "Sort by Year <i class='fas fa-sort-down'></i>";
        });
    }

    // =========================================================================
    // 3. HOBBIES SECTION: Read More / Read Less line clamp toggle
    // =========================================================================
    const hobbyParas = document.querySelectorAll(".hobby-content p");
    
    hobbyParas.forEach(p => {
        // Limit to 2 lines via inline style rules initially
        p.style.display = "-webkit-box";
        p.style.webkitLineClamp = "2";
        p.style.webkitBoxOrient = "vertical";
        p.style.overflow = "hidden";
        
        // Append a dynamic read more trigger link inside the row container
        const toggleBtn = document.createElement("a");
        toggleBtn.href = "#";
        toggleBtn.innerText = "Read More";
        toggleBtn.style.cssText = "display:block; margin-top:8px; color:#914652; font-family:'Playfair Display', serif; font-weight:bold; font-size:0.9rem; text-decoration:none;";
        p.parentNode.appendChild(toggleBtn);
        
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (p.style.webkitLineClamp === "2") {
                p.style.webkitLineClamp = "none";
                toggleBtn.innerText = "Read Less";
            } else {
                p.style.webkitLineClamp = "2";
                toggleBtn.innerText = "Read More";
            }
        });
    });

    // =========================================================================
    // 4. IMAGE SECTION: Built-in Lightbox overlay setup
    // =========================================================================
    const profileImg = document.querySelector(".profile-picture");
    if (profileImg) {
        profileImg.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.85); display:flex; justify-content:center; align-items:center; z-index:9999; cursor:pointer;";
            
            const fullImg = document.createElement("img");
            fullImg.src = profileImg.src;
            fullImg.style.cssText = "max-width:85%; max-height:85%; border:4px solid #C5A059; border-radius:10px;";
            
            const closeBtn = document.createElement("span");
            closeBtn.innerHTML = "&times;";
            closeBtn.style.cssText = "position:absolute; top:20px; right:35px; color:white; font-size:40px; font-weight:bold; cursor:pointer;";
            
            overlay.appendChild(fullImg);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);
            
            overlay.addEventListener("click", () => overlay.remove());
        });
    }

    // =========================================================================
    // 5. NAVIGATION: Scroll-to-top button generator
    // =========================================================================
    const toTopBtn = document.createElement("button");
    toTopBtn.innerHTML = "<i class='fas fa-arrow-up'></i>";
    toTopBtn.style.cssText = "position:fixed; bottom:30px; right:30px; background:#914652; color:white; border:none; width:45px; height:45px; border-radius:50%; cursor:pointer; box-shadow:0 4px 10px rgba(0,0,0,0.3); display:none; z-index:999;";
    document.body.appendChild(toTopBtn);
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            toTopBtn.style.display = "block";
        } else {
            toTopBtn.style.display = "none";
        }
    });
    
    toTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // =========================================================================
    // 6. DARK/LIGHT MODE TOGGLE BUTTON: Embedded right at the page header top
    // =========================================================================
    const headerContainer = document.createElement("div");
    headerContainer.style.cssText = "text-align:right; max-width:1100px; margin:15px auto; padding:0 20px;";
    
    const themeBtn = document.createElement("button");
    themeBtn.innerHTML = "<i class='fas fa-moon'></i> Dark Mode";
    themeBtn.style.cssText = "background:#C5A059; color:white; border:none; padding:8px 16px; border-radius:20px; cursor:pointer; font-family:'Playfair Display', serif;";
    
    headerContainer.appendChild(themeBtn);
    document.body.insertBefore(headerContainer, document.body.firstChild);
    
    // Inject dark theme CSS styles dynamically on toggle click
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        body.dark-mode { background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=2073') !important; background-attachment: fixed !important; background-size: cover !important; }
        body.dark-mode section { background: rgba(35, 35, 35, 0.9) !important; border-color: rgba(255,255,255,0.1) !important; }
        body.dark-mode h1, body.dark-mode h2, body.dark-mode caption { color: #E5C179 !important; }
        body.dark-mode tbody td { background-color: #2b2b2b !important; color: #eee !important; }
        body.dark-mode .hobby-content p { color: #ddd !important; }
    `;
    document.head.appendChild(styleSheet);
    
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            themeBtn.innerHTML = "<i class='fas fa-sun'></i> Light Mode";
        } else {
            themeBtn.innerHTML = "<i class='fas fa-moon'></i> Dark Mode";
        }
    });
});