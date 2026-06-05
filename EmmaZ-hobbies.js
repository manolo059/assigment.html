// Toggles hobby description between collapsed and expanded
document.querySelectorAll(".hobby").forEach(hobby => {
  const btn = hobby.querySelector(".toggleBtn");
  const desc = hobby.querySelector(".hobby-desc");

  btn.addEventListener("click", () => {
    if (!desc.classList.contains("expanded")) {
        // Expand and add extra words
    desc.classList.add("expanded");
    desc.textContent = desc.getAttribute("data-short") + " Capturing urban landscapes and nature.";
    btn.textContent = "Read Less";
    } else {    // Collapse back to original text 
    desc.classList.remove("expanded");
    desc.textContent = desc.getAttribute("data-short");
    btn.textContent = "Read More";
    }    
  });
});
