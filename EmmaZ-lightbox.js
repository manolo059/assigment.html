/**
 * lightbox.js
 * -----------
 * This script adds a fully featured lightbox overlay to a photo gallery.
 * When the user clicks any gallery image, a styled full-screen overlay opens
 * displaying the enlarged image with a close button.
 *
 * Overlay features:
 *  - Darkened full-screen backdrop behind the image
 *  - Centered image display inside the overlay
 *  - Close (×) button in the top-right corner
 *  - Click outside the image (on the backdrop) to close
 *  - Press the Escape key to close
 *  - Page scrolling is locked while the lightbox is open
 */

// Select every <img> element inside the ".gallery" container and
// loop through each one to attach click behaviour individually.
document.querySelectorAll(".gallery img").forEach(img => {

  // Attach a click event listener to each gallery image.
  // The lightbox opens when the user clicks on an image.
  img.addEventListener("click", () => {

    // ── BUILD THE OVERLAY BACKDROP ──────────────────────────────────────────

    // Create the main overlay <div> that covers the entire screen.
    const overlay = document.createElement("div");

    // Apply inline styles to turn this div into a full-screen darkened backdrop.
    // position: fixed   → stays in place even when the page is scrolled.
    // inset: 0          → stretches it to cover all four edges of the viewport.
    // background        → semi-transparent black to dim the page behind.
    // display: flex     → enables centering the image inside the overlay.
    // z-index: 1000     → places it above all other page content.
    Object.assign(overlay.style, {
      position:       "fixed",
      inset:          "0",
      background:     "rgba(0, 0, 0, 0.85)",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      zIndex:         "1000",
      cursor:         "zoom-out",   // Cursor hints that clicking closes the overlay
    });

    // ── BUILD THE ENLARGED IMAGE ────────────────────────────────────────────

    // Create the <img> element that will display the full-size version of the
    // clicked gallery image inside the overlay.
    const enlargedImg = document.createElement("img");
    enlargedImg.src = img.src;   // Use the same image source as the clicked thumbnail
    enlargedImg.alt = img.alt;   // Preserve the alt text for accessibility

    // Style the enlarged image so it fits neatly inside the overlay.
    // max-width / max-height keep it within the viewport with some breathing room.
    // box-shadow adds a subtle frame around the image.
    // cursor: default prevents the zoom-out cursor from showing over the image itself.
    Object.assign(enlargedImg.style, {
      maxWidth:     "90vw",
      maxHeight:    "90vh",
      objectFit:    "contain",    // Preserve aspect ratio without cropping
      borderRadius: "6px",
      boxShadow:    "0 8px 32px rgba(0,0,0,0.6)",
      cursor:       "default",    // Clicking the image itself should not close the overlay
    });

    // Stop click events on the image from bubbling up to the overlay backdrop.
    // Without this, clicking the image would also trigger the backdrop's close handler.
    enlargedImg.addEventListener("click", e => e.stopPropagation());

    // ── BUILD THE CLOSE BUTTON ──────────────────────────────────────────────

    // Create a <button> element for the × close button shown in the top-right corner.
    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "&times;"; // × symbol
    closeBtn.setAttribute("aria-label", "Close lightbox"); // Accessibility label

    // Style the close button to sit fixed in the top-right corner of the overlay.
    Object.assign(closeBtn.style, {
      position:   "fixed",
      top:        "18px",
      right:      "24px",
      background: "transparent",
      border:     "none",
      color:      "#ffffff",
      fontSize:   "2.5rem",
      cursor:     "pointer",
      lineHeight: "1",
      zIndex:     "1001",         // Above the overlay itself
    });

    // ── DEFINE THE CLOSE FUNCTION ───────────────────────────────────────────

    /**
     * closeLightbox()
     * Removes the overlay from the DOM, re-enables page scrolling,
     * and cleans up the keyboard event listener.
     */
    function closeLightbox() {
      overlay.remove();                                          // Remove overlay from the page
      document.body.style.overflow = "";                        // Restore page scrolling
      document.removeEventListener("keydown", handleKeyDown);   // Clean up key listener
    }

    // ── CLOSE TRIGGERS ─────────────────────────────────────────────────────

    // Close when the × button is clicked.
    closeBtn.addEventListener("click", closeLightbox);

    // Close when the user clicks directly on the dark backdrop
    // (anywhere outside the enlarged image).
    overlay.addEventListener("click", closeLightbox);

    // Close when the user presses the Escape key on the keyboard.
    function handleKeyDown(e) {
      if (e.key === "Escape") closeLightbox();
    }
    document.addEventListener("keydown", handleKeyDown);

    // ── ASSEMBLE AND DISPLAY THE OVERLAY ───────────────────────────────────

    // Add the enlarged image and close button into the overlay backdrop.
    overlay.appendChild(enlargedImg);
    overlay.appendChild(closeBtn);

    // Attach the completed overlay to <body> so it renders on top of the page.
    document.body.appendChild(overlay);

    // Lock the page scroll while the lightbox is open so the background
    // does not scroll behind the overlay.
    document.body.style.overflow = "hidden";
  });
});
