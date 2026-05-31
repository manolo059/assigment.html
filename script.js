// Digital Clock
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString(); // HH:MM:SS format
    document.getElementById("clock").textContent = timeString;
}
setInterval(updateClock, 1000); // update every second
updateClock(); // run immediately on load

// Typewriter Effect
const message = "Thank you for visiting our entry point. Please use the menu above to explore the individual contributions of our team members.";
const limit = 120; // character limit
const target = document.getElementById("welcome");

let index = 0;
function typeWriter() {
    if (index < limit && index < message.length) {
        target.textContent += message.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // typing speed (ms per character)
    }
}
typeWriter();
