// Opens image in a centered overlay lightbox with close button
document.querySelectorAll(".gallery img").forEach(img => {
  img.addEventListener("click", () => {
    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `<img src="${img.src}" alt=""><span class="close">&times;</span>`;
    document.body.appendChild(overlay);

    overlay.querySelector(".close").addEventListener("click", () => {
      overlay.remove();
    });
  });
});
