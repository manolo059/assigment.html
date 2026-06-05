// Shows scroll-to-top button after 200px and scrolls smoothly to top
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
