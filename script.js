// ── DIGITAL CLOCK ────────────────────────────────────────────────────────────

/**
 * updateClock()
 * Reads the current time and displays it inside the element with id "clock".
 * Called once on page load and then repeatedly every second via setInterval.
 */
function updateClock() {
    // Create a new Date object that captures the current date and time.
    const now = new Date();

    // Convert the current time to a readable string in HH:MM:SS format
    // using the browser's local timezone and locale settings.
    const timeString = now.toLocaleTimeString(); // e.g. "14:35:09"

    // Update the text content of the element with id "clock" to show the current time.
    document.getElementById("clock").textContent = timeString;
}

setInterval(updateClock, 1000);

// Also call updateClock() immediately so the clock appears right away
// when the page loads, without waiting for the first 1-second interval.
updateClock();


// ── TYPEWRITER EFFECT ────────────────────────────────────────────────────────

const message = "Welcome!.";

// The maximum number of characters to display from the message.
// This acts as a safety cap in case the message is longer than intended.
const limit = 120;

// The target DOM element where the message will be typed into.
// It should have id="typewriter" in the HTML.
const target = document.getElementById("typewriter");

// A counter that tracks which c    haracter position we are currently at
// as the typewriter effect progresses through the message string.
let index = 0;

/**
 * typeWriter()
 * Recursively types one character at a time into the target element.
 * It stops when the index reaches either the character limit or the end of the message,
 * whichever comes first.
 */
function typeWriter() {
    // Continue only if we haven't reached the character limit AND
    // there are still characters left in the message to type.
    if (index < limit && index < message.length) {

        // Append the next character from the message to the element's current text.
        target.textContent += message.charAt(index);

        // Move the index forward to point to the next character.
        index++;

        // Schedule typeWriter() to run again after 100 milliseconds.
        // This delay controls the typing speed — lower = faster, higher = slower.
        setTimeout(typeWriter, 1000); // typing speed: 100ms per character
    }
    // When the condition is false, the function stops calling itself
    // and the typewriter effect ends naturally.
}

// Start the typewriter effect as soon as the script runs.
typeWriter();
