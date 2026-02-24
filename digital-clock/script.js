function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString() + " | " + now.toDateString();
}

setInterval(updateClock, 1000);
updateClock();