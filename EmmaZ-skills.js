// Toggles skill details visibility when a skill item is clicked
document.querySelectorAll(".skill-item").forEach(skill => {
  skill.addEventListener("click", () => {
    const details = skill.querySelector(".skill-details");
    details.classList.toggle("hidden");
  });
});
