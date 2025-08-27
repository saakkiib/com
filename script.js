// Clock
function updateClock() {
  let now = new Date();
  let hours = now.getHours().toString().padStart(2, '0');
  let minutes = now.getMinutes().toString().padStart(2, '0');
  let seconds = now.getSeconds().toString().padStart(2, '0');
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  document.getElementById("clock").innerText = `${hours}:${minutes}:${seconds}`;
  document.getElementById("day").innerText = days[now.getDay()];
}
setInterval(updateClock, 1000);
updateClock();

// Dark Mode
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.getElementById("modeToggle").innerText = 
    document.body.classList.contains("dark") ? "☀️" : "🌙";
});

// Scroll Animation
const sections = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.style.opacity = "1";
  });
});
sections.forEach(section => observer.observe(section));